// export const CONTEXT = './api';
export const CONTEXT = '';

export const LOGIN = CONTEXT + '/user/login';
export const LOGOUT = CONTEXT + '/user/logout';
export const CHANGE_PWD = CONTEXT + '/changePwd';

export const SYS_MENU_UPDATE = CONTEXT + '/menu/editMenu';
export const SYS_MENU_DELETE = CONTEXT + '/menu/delSunMenu';
export const SYS_MENU_ADD = CONTEXT + '/menu/addSunMenu';
export const SYS_MENU_LIST = CONTEXT + '/menu/getUserMenu';
export const SYS_MENU_LIST2 = CONTEXT + '/menu/listAll';

export const SYS_ROLE_UPDATE = CONTEXT + '/role/update';
export const SYS_ROLE_DELETE = CONTEXT + '/role/delete';
export const SYS_ROLE_ADD = CONTEXT + '/role/add';
export const SYS_ROLE_LIST = CONTEXT + '/role/selectAllRole';
export const SYS_SET_ROLE_RESOURCE = CONTEXT + '/authorization/addauthorMenu';
export const SYS_DELETE_ROLE_RESOURCE = CONTEXT + '/authorization/delauthorMenu';

export const SYS_ROLE_MENU = CONTEXT + '/authorization/authorMenuList';
export const SYS_ROLE_AUTHORIZATION = CONTEXT + '/menu/getReloMenu';

export const SYS_AUTHORIZATION = CONTEXT + '/authorization/allmenuAuthority';
export const SYS_AUTHORIZATION_ADD = CONTEXT + '/authorization/authorityMenuAdd';

export const SYS_RESOURCE_LIST = CONTEXT + '/menu/getRoleMenus';

export const SYS_SETTLEDIN_LIST = CONTEXT + '/settledIn/list';
export const SYS_SETTLEDIN_SET_PASS = CONTEXT + '/settledIn/setPass';
export const SYS_CONFIG_GET = CONTEXT + '/setting/get';

export const SYS_CONFIG_LIST = CONTEXT + '/setting/getSetting';
export const SYS_CONFIG_EDIT = CONTEXT + '/setting/admin/editSetting';

export const SYS_USER_GET = CONTEXT + '/user/list';
export const SYS_USER_ADD = CONTEXT + '/user/add';
export const SYS_USER_UPDATE = CONTEXT + '/user/update';
export const SYS_USER_UPDATE_STATUS = CONTEXT + '/user/editUserState';
export const SYS_USER_DELETE = CONTEXT + '/user/delete';
export const SYS_USER_PAGE = CONTEXT + '/user/list';
export const SYS_USER_ROLE = CONTEXT + '/authorization/getByUserId';
export const SYS_SET_USER_ROLE = CONTEXT + '/authorization/addToUser';
export const SYS_DELETE_USER_ROLE = CONTEXT + '/authorization/delToUser';

export const WASTE_PAGE = CONTEXT + '/classification/list';

export const ORDER_CREATE = CONTEXT + '/order/create';

export const WASTE_CATEGORY_PARENT = CONTEXT + '/classification/classificationList';
export const WASTE_CATEGORY_PARENT_UPDATE = CONTEXT + '/classification/update';
export const WASTE_CATEGORY_PARENT_DELETE = CONTEXT + '/classification/delete';
export const WASTE_CATEGORY_PARENT_ADD = CONTEXT + '/classification/add';

export const WASTE_CATEGORY_CHILDREN = CONTEXT + '/classification/classificationSonList';
export const WASTE_CATEGORY_CHILDREN_UPDATE = CONTEXT + '/classification/updateSon';
export const WASTE_CATEGORY_CHILDREN_DELETE = CONTEXT + '/classification/deleteSon';
export const WASTE_CATEGORY_CHILDREN_ADD = CONTEXT + '/classification/addSon';


export const MSG_TOP_TEN = CONTEXT + '/messageList';
export const TEST_DATA = CONTEXT + '/static/data/data.json';
