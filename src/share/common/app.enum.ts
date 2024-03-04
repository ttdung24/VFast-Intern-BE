export enum SortOrderEnum {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum USER_ROLE {
  ADMIN = 'Admin',
  USER = 'User',
}

export enum PermissonEnum {
  USER_CREATE = 'user_create',
  USER_UPDATE = 'user_update',
  USER_DELETE = 'user_delete',
  USER_VIEW = 'user_view',
  USER_VIEW_ALL = 'user_view_all',

  PERMISSION_CREATE = 'permission_create',
  PERMISSION_UPDATE = 'permission_update',
  PERMISSION_VIEW = 'permission_view',
  PERMISSION_DELETE = 'permission_delete',

  ROLE_CREATE = 'role_create',
  ROLE_UPDATE = 'role_update',
  ROLE_VIEW = 'role_view',
  ROLE_DELETE = 'role_delete',
}
