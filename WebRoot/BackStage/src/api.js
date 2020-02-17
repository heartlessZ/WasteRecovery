// export const CONTEXT = './api';
export const CONTEXT = '';

export const LOGIN = CONTEXT + '/user/login';
export const LOGOUT = CONTEXT + '/user/logout';
export const CHANGE_PWD = CONTEXT + '/changePwd';

export const SYS_MENU_UPDATE = CONTEXT + '/menu/editMenu';
export const SYS_MENU_DELETE = CONTEXT + '/menu/delSunMenu';
export const SYS_MENU_ADD = CONTEXT + '/menu/addSunMenu';
export const SYS_MENU_LIST = CONTEXT + '/menu/getUserMenu';
export const SYS_MENU_LIST2 = CONTEXT + '/menu/getMenuList';
export const SYS_MENU_PAGE = CONTEXT + '/sys/menu/page';
export const SYS_MENU_GET = CONTEXT + '/sys/menu/get';

export const SYS_ROLE_GET = CONTEXT + '/sys/role/get';
export const SYS_ROLE_UPDATE = CONTEXT + '/role/update';
export const SYS_ROLE_DELETE = CONTEXT + '/role/delete';
export const SYS_ROLE_ADD = CONTEXT + '/role/add';
export const SYS_ROLE_PAGE = CONTEXT + '/sys/role/page';
export const SYS_ROLE_LIST = CONTEXT + '/role/selectAllRole';
export const SYS_ROLE_LIST2 = CONTEXT + '/sys/role/list2';
export const SYS_ROLE_RESOURCE = CONTEXT + '/sys/role/resources';
export const SYS_SET_ROLE_RESOURCE = CONTEXT + '/authorization/addauthorMenu';

export const SYS_RESOURCE_GET = CONTEXT + '/sys/resource/get';
export const SYS_RESOURCE_UPDATE = CONTEXT + '/sys/resource/update';
export const SYS_RESOURCE_DELETE = CONTEXT + '/sys/resource/delete';
export const SYS_RESOURCE_ADD = CONTEXT + '/sys/resource/add';
export const SYS_RESOURCE_PAGE = CONTEXT + '/sys/resource/page';
export const SYS_RESOURCE_LIST = CONTEXT + '/menu/getRoleMenus';
export const SYS_RESOURCE_LIST2 = CONTEXT + '/sys/resource/list2';

export const SYS_USER_GET = CONTEXT + '/user/list';
export const SYS_USER_ADD = CONTEXT + '/user/add';
export const SYS_USER_UPDATE = CONTEXT + '/user/update';
export const SYS_USER_DELETE = CONTEXT + '/user/delete';
export const SYS_USER_PAGE = CONTEXT + '/user/list';
export const SYS_USER_ROLE = CONTEXT + '/authorization/getByUserId';
export const SYS_SET_USER_ROLE = CONTEXT + '/authorization/addToUser';

export const MSG_TOP_TEN = CONTEXT + '/messageList';
export const TEST_DATA = CONTEXT + '/static/data/data.json';