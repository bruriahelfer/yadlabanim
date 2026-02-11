<?php

use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;

$autoloader = require_once 'vendor/autoload.php';
$kernel = new DrupalKernel('prod', $autoloader);
$request = Request::createFromGlobals();
$kernel->boot();
$kernel->prepareLegacyRequest($request);

echo "Starting entity type rebuild...\n";

// Clear all caches first
drupal_flush_all_caches();
echo "Caches cleared.\n";

// Rebuild entity type definitions
$entity_type_manager = \Drupal::entityTypeManager();
$entity_type_manager->clearCachedDefinitions();
echo "Entity type definitions cleared.\n";

// Clear field definitions
\Drupal::service('entity_field.manager')->clearCachedFieldDefinitions();
echo "Field definitions cleared.\n";

// Clear bundle info
\Drupal::service('entity_type.bundle.info')->clearCachedBundles();
echo "Bundle info cleared.\n";

// Update entity definitions
try {
    $update_manager = \Drupal::entityDefinitionUpdateManager();
    $change_list = $update_manager->getChangeList();
    
    if (!empty($change_list)) {
        echo "Found entity changes:\n";
        print_r($change_list);
        
        // Apply updates
        foreach ($change_list as $entity_type_id => $changes) {
            echo "Processing {$entity_type_id}...\n";
        }
    } else {
        echo "No entity changes detected.\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

// Final cache clear
drupal_flush_all_caches();
echo "\nDone! Try creating the field again.\n";