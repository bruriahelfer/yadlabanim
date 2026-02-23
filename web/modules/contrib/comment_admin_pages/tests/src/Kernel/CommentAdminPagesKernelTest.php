<?php

namespace Drupal\Tests\comment_admin_pages\Kernel;

use Drupal\KernelTests\KernelTestBase;

/**
 * Test functionality of comment_admin_pages module.
 *
 * @group comment_admin_pages
 */
class CommentAdminPagesKernelTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'comment_admin_pages',
    'comment',
  ];

  /**
   * The route provider.
   *
   * @var \Drupal\Core\Routing\RouteProviderInterface
   */
  protected $routeProvider;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    $this->routeProvider = $this->container->get('router.route_provider');
  }

  /**
   * Test that the _admin_route options is added to the right routes.
   */
  public function testAdminRoute() {
    // Check if the _admin_route options is added for the comment edit form.
    $route = $this->routeProvider->getRouteByName('entity.comment.edit_form');
    $this->assertEquals(TRUE, $route->getOption('_admin_route'));

    // Check if the _admin_route options is added for the comment delete form.
    $route = $this->routeProvider->getRouteByName('entity.comment.delete_form');
    $this->assertEquals(TRUE, $route->getOption('_admin_route'));
  }

}
