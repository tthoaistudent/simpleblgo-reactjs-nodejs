// types
import { createSlice } from '@reduxjs/toolkit';
import menuItems from 'menu-items/index';

const getIdMenuCurrent = () => {
    var currentUrl = window.location.pathname;
    var menuId = [];
    var childrenActive = null;
    menuItems.items.forEach(item => {
        if(item.type == 'group'){
            childrenActive = item.children.filter((children) => children.url == currentUrl);
        }
    });
    if(childrenActive.length > 0){
        menuId.push(childrenActive[0].id);
    }else{
        menuId.push('dashboard');
    }
    return menuId;
}

// initial state
const initialState = {
    openItem: getIdMenuCurrent(),
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        }
    }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } = menu.actions;
