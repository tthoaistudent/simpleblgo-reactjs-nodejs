// assets
import { BookOutlined, PlusOutlined,TagOutlined } from '@ant-design/icons';

// icons
const icons = {
    BookOutlined,
    PlusOutlined,
    TagOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'ground-post',
    title: 'Post',
    type: 'group',
    children: [
        {
            id: 'post',
            title: 'Posts',
            type: 'item',
            url: '/posts',
            icon: icons.BookOutlined,
            breadcrumbs: false
        },
        {
            id: 'posts-create',
            title: 'Create Post',
            type: 'item',
            url: '/posts/create',
            icon: icons.PlusOutlined,
            breadcrumbs: false
        },
        {
            id: 'posts-tag',
            title: 'Post Tag',
            type: 'item',
            url: '/posts/tag',
            icon: icons.TagOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;