<?php

namespace Drupal\shorthand;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Shorthand story entity.
 *
 * @see \Drupal\shorthand\Entity\ShorthandStory.
 */
class ShorthandStoryAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\shorthand\Entity\ShorthandStoryInterface $entity */
    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished shorthand story entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published shorthand story entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit shorthand story entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete shorthand story entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add shorthand story entities');
  }

}
