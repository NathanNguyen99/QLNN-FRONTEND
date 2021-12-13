export const PlacetypeData = [
    {oid : 1, placeTypeName : 'Phường'},
    {oid : 2, placeTypeName : 'Trung tâm cai nghiện'},
    {oid : 3, placeTypeName : 'Trại Giam'}
];

export const GenderData = [
    {id: 0, Text: 'Nam'},
    {id: 1, Text: 'Nữ'},
    {id: 3, Text: 'Khác'}
];

export const ManageTypeData = [
    {oid: 1, Text: 'A'},
    {oid: 2, Text: 'B'},
    {oid: 3, Text: 'C'}
];

export const Marriage = [
    {oid: 1, Text: 'Chưa kết hôn'},
    {oid: 2, Text: 'Đã kết hôn'},
    {oid: 3, Text: 'Ly hôn'}
];

export const Country = [
    {oid: 1, Text: 'Việt nam'},
    {oid: 2, Text: 'Nước ngoài'}
];

export const Ethnic = [
    {oid: 1, Text: 'Kinh'},
    {oid: 2, Text: 'Khác'}
];

export const WorkStatus = [
    {oid: 1, Text: 'Có việc làm'},
    {oid: 2, Text: 'Có việc làm nhưng không ổn định'},
    {oid: 3, Text: 'Không có việc làm'}
];

export const Religion = [
    {oid: 1, Text: 'Có'},
    {oid: 2, Text: 'Không'}
];

export const Ingredient = [
    {oid: 1, Text: 'Học sinh'},
    {oid: 2, Text: 'Sinh viên'},
    {oid: 3, Text: 'Cán bộ'},
    {oid: 4, Text: 'Công chức'},
    {oid: 5, Text: 'Viên chức'},
    {oid: 6, Text: 'Công nhân'},
    {oid: 7, Text: 'Nông dân'},
    {oid: 8, Text: 'Khác'}
];

export const appMenuItem = [
    {
        oid : 1,
        label: 'Dashboard',
        icon: 'dashboard',
        link:  '/home/dashboard'
    },
    {
        oid: 2,
        label: 'Hồ sơ đối tượng',
        icon: 'group',      
        items: [
            {
                label: 'Danh sách đối tượng',
                link: '/home/addict/addict',
                icon: 'face'
            },
            {
                label: 'Tìm kiếm',
                link: '/home/addict/addict-search',
                icon: 'search'
            },
            {
                label: 'Lịch sử di chuyển',
                link: '/home/addict/addict-move',
                icon: 'history'
            },
            {
                label: 'Lịch sử hoạt động',
                icon: 'assignment_turned_in',         
                link: '/home/addict/addict-place'
            },
            // {
            //     label: 'Lịch sử hoạt động',
            //     icon: 'assignment_turned_in',         
            //     link: '/home/addict/addict-place'
            // },
            {
                label: 'Lịch sử quan hệ',           
                icon: 'speaker_notes',
                link: '/home/addict/addict-drug'
            },
            // {
            //     label: 'Phân loại đối tượng',
            //     icon: 'dvr',
            //     link: '/home/addict/addict-classify'
            // },
            // {
            //     label: 'Phương tiện người nghiện',
            //     icon: 'local_car_wash',
            //     link: '/home/addict/addict-vehicle'
            // }
        ]
    },
    {
        oid : 3,
        label: 'Danh mục',
        icon: 'table_chart',      
        items: [
            {
                label: 'Nơi quản lý',
                link: '/home/category/manageplace',
                icon: 'send'
              },
            {
                label: 'Loại ma túy',
                link: '/home/category/drugs',
                icon: 'send'
            },
            {
                label: 'Loại quan hệ',
                link: '/home/category/relations',
                icon: 'send'
            },
            {
                label: 'Phân loại',
                link: '/home/category/classify',
                icon: 'send'
            },
            {
                label: 'Trình độ học vấn',
                link: '/home/category/edulevel',
                icon: 'send'
            }
      ]
    },
    {
        oid : 4,
        label: 'Báo cáo thống kê',
        icon: 'bar_chart',
        items: [
            {
                label: 'Theo hồ sơ cá nhân',
                link: '/item-2-1',
                icon: 'insert_chart_outlined'
            },
            {
                label: 'Theo phân loại',
                link: '/item-2-2',
                icon: 'insert_chart_outlined'
            },
            {
                label: 'Theo địa phương',
                link: '/item-2-2',
                icon: 'insert_chart_outlined'
            }
        ]
    },
    {
        oid : 5,
        label: 'Hệ thống',
        icon: 'computer',
        hidden: true,
        items: [
            {
            label: 'Người dùng',
            link: '/home/system/user-account',
            icon: 'account_circle'
            }
        ]
    }
  ];