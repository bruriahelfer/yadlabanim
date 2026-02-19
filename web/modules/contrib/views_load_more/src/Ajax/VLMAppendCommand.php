<?php

namespace Drupal\views_load_more\Ajax;

use Drupal\Core\Ajax\CommandInterface;
use Drupal\Core\Ajax\CommandWithAttachedAssetsInterface;
use Drupal\Core\Ajax\CommandWithAttachedAssetsTrait;
use Drupal\views_load_more\Plugin\views\pager\LoadMore;

/**
 * Appends new rows to the existing rows in a paged AJAX response.
 *
 * This command is implemented in
 * Drupal.AjaxCommands.prototype.viewsLoadMoreAppend.
 */
class VLMAppendCommand implements CommandInterface, CommandWithAttachedAssetsInterface {

  use CommandWithAttachedAssetsTrait;

  /**
   * The options for the command.
   *
   * @var array
   */
  protected $options;

  /**
   * The content to append.
   *
   * Either a render array or an HTML string.
   *
   * @var string|array
   */
  protected $content;

  /**
   * Constructs a \Drupal\views\Ajax\ScrollTopCommand object.
   *
   * @todo document
   *
   * @param string $content
   *   The content to append.
   * @param array $options
   *   Array with the following keys:
   *   - method
   *   - wrapper_selector
   *   - content_selector
   *   - pager_selector
   *   - effect
   *   - speed
   *   - target_list.
   */
  public function __construct($content, $options) {
    $this->content = $content;
    $defaults = [
      'method' => 'append',
      'wrapper_selector' => NULL,
      'content_selector' => LoadMore::DEFAULT_CONTENT_SELECTOR,
      'pager_selector' => LoadMore::DEFAULT_PAGER_SELECTOR,
      'effect' => '',
      'speed' => '',
      'target_list' => '',
    ];
    $this->options = array_merge($defaults, $options);
  }

  /**
   * Implements \Drupal\Core\Ajax\CommandInterface::render().
   */
  public function render() {
    return [
      'command' => 'viewsLoadMoreAppend',
      'data' => $this->getRenderedContent(),
      'options' => $this->options,
    ];
  }

}
