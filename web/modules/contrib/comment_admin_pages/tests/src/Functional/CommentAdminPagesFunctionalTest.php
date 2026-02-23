<?php

namespace Drupal\Tests\comment_admin_pages\Functional;

use Drupal\comment\Entity\Comment;
use Drupal\comment\Tests\CommentTestTrait;
use Drupal\Tests\BrowserTestBase;

/**
 * Test functionality of comment_admin_pages module.
 *
 * @group comment_admin_pages
 */
class CommentAdminPagesFunctionalTest extends BrowserTestBase {

  use CommentTestTrait;

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'comment_admin_pages_test',
    'node',
  ];

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * A user with access to the admin theme.
   *
   * @var \Drupal\user\Entity\User
   */
  protected $adminThemeUser;

  /**
   * A user with no access to the admin theme.
   *
   * @var \Drupal\user\Entity\User
   */
  protected $nonAdminThemeUser;

  /**
   * The Drupal state.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    $this->adminThemeUser = $this->createUser([
      'administer comments',
      'view the administration theme',
    ]);
    $this->nonAdminThemeUser = $this->createUser(['administer comments']);

    $node_type = $this->drupalCreateContentType();
    $this->addDefaultCommentField('node', $node_type->id());

    $node = $this->drupalCreateNode([
      'title' => 'Test node',
      'type' => $node_type->id(),
    ]);

    $comment = Comment::create([
      'subject' => 'My comment title',
      'uid' => 1,
      'name' => 'Test',
      'mail' => 'test@localhost',
      'entity_type' => 'node',
      'field_name' => 'comment',
      'comment_type' => 'comment',
      'entity_id' => $node->id(),
      'status' => TRUE,
    ]);
    $comment->save();

    $this->container->get('theme_installer')->install(['test_theme']);
    $this->config('system.theme')->set('admin', 'test_theme')->save();

    $this->state = $this->container->get('state');
  }

  /**
   * Test that the _admin_route options is added to the right routes.
   */
  public function testAdminRoute() {
    $this->drupalLogin($this->adminThemeUser);
    $this->drupalGet('comment/1/edit');
    $this->assertEquals('test_theme', $this->state->get('comment_admin_pages_test.active_theme'));
    $this->drupalGet('comment/1/delete');
    $this->assertEquals('test_theme', $this->state->get('comment_admin_pages_test.active_theme'));

    $this->drupalLogin($this->nonAdminThemeUser);
    $this->drupalGet('comment/1/edit');
    $this->assertEquals('stark', $this->state->get('comment_admin_pages_test.active_theme'));
    $this->drupalGet('comment/1/delete');
    $this->assertEquals('stark', $this->state->get('comment_admin_pages_test.active_theme'));
  }

}
