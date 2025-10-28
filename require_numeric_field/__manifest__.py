{
    'name': 'Addons: Numeric Field Required',
    'description': 'Make numeric field be required before saving',
    'author': 'LTrThanh',
    'depends': ['base', 'web'],
    'application': False,
    'version': '18.1.0.2',
    'license': 'AGPL-3',
    'support': 'ltrthanh.dev@gmail.com',
    'installable': True,
    'data': [
    ],
    'assets': {
        "web.assets_backend": [
            'require_numeric_field/static/src/model/relation_model/record.js',
        ]
    },
    'images': ['static/description/icon.png']
}
