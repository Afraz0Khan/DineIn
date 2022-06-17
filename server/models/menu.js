const mongoose = require('mongoose');


const Menu = new mongoose.Schema({
    "user_id": {
        "type": "String"
    },
    "menu": {
        "categories": {
            "type": [
                "Mixed"
            ]
        }
    }
},
{collection: 'menus'});

// to do:
// add IDs to categories and items

module.exports = mongoose.model('Menu', Menu);


// sample json:



// {
//     "id": "joe",
//     "menu": {
//       "categories": [
//         {
//           "category": "breakfast",
//           "items": [
//             {
//               "name": "bread",
//               "price": 29.00,
//               "description": "fkjflaughlrah",
//               "image": "fkljsbfglaerulighaw"
//             },
//             {
//               "name": "milk",
//               "price": 15.00,
//               "description": "fluabflasjrn",
//               "image": "flkjanfklejnfe"
//             }
//           ]
//         },
//         {
//           "category": "lunch",
//           "items": [
//             {
//               "name": "pasta",
//               "price": 69.00,
//               "description": "fliugiuaehf",
//               "image": "fluerahgoiqrthp"
//             },
//             {
//               "name": "pizza",
//               "price": 852.69,
//               "description": "pizza",
//               "image": "f;kajrnglragnakjn"
//             }
//           ]
//         }
//       ]
//     }
// }