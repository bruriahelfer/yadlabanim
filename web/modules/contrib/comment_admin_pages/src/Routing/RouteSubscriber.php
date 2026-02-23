<?php

namespace Drupal\comment_admin_pages\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Drupal\Core\Routing\RoutingEvents;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

/**
 * Alters comment routes so they use the admin pages.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection): void {
    $this->addAdminRouteOption($collection, 'entity.comment.edit_form');
    $this->addAdminRouteOption($collection, 'entity.comment.delete_form');
  }

  /**
   * Add _admin_route option to the given route name.
   *
   * @param \Symfony\Component\Routing\RouteCollection $collection
   *   The route collection.
   * @param string $route_name
   *   The route name.
   */
  protected function addAdminRouteOption(RouteCollection $collection, string $route_name): void {
    $route = $collection->get($route_name);

    if ($route instanceof Route) {
      $route->setOption('_admin_route', TRUE);
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    $events = parent::getSubscribedEvents();
    $events[RoutingEvents::ALTER] = ['onAlterRoutes'];
    return $events;
  }

}
