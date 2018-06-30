const furnitureData = {
  "1":{
        "id": 1,
        "make": "Ikea",
        "model": "Sofa",
        "year": 2005,
        "description": "It is very good sofa",
        "price": 790,
        "image": "https://productimages.mybobs.com/20023542003/20023542003_hero_listings_large.jpg",
        "createdOn": "2017-11-14T08:37:36.871Z",
        "createdBy": "pesho@mail.com",
        "likes": [
            "pesho@mail.com"
        ],
        "reviews": [
            {
                "rating": 4,
                "comment": "I liked the sofa, it is good for sitting",
                "user": "pesho",
                "createdOn": "2017-11-14T08:50:31.202Z"
            }
        ],
        "material": "Soft but sturdy"
    },
  "2":{
        "id": 2,
        "make": "Ikea",
        "model": "Chair",
        "year": 2007,
        "description": "Comfy chair",
        "price": 98,
        "image": "https://cdn.bmstores.co.uk/images/hpcProductImage/imgFull/304315-Glitz-chair-mink1.jpg",
        "createdOn": "2017-11-14T08:37:36.871Z",
        "createdBy": "pesho@mail.com",
        "likes": [],
        "reviews": [],
        "material": "Pleasant"
    },
  "3":{
        "id": 3,
        "make": "Ikea",
        "model": "Table",
        "year": 2006,
        "description": "Dining table",
        "price": 249,
        "image": "http://lavetrinabio.com/wp-content/uploads/2018/04/awesome-1115-best-dining-tables-images-on-pinterest-side-chairs-dining-30-inch-round-dining-table-and-chairs-prepare.jpg",
        "createdOn": "2017-11-14T08:37:36.871Z",
        "createdBy": "pesho@mail.com",
        "likes": [],
        "reviews": [],
        "material": "Wood"
    }

}
let currentId = 3

module.exports = {
  total: () => Object.keys(furnitureData).length,
  save: (furniture) => {
    const id = ++currentId
    furniture.id = id

    let newFurniture = {
      id,
      make: furniture.make,
      model: furniture.model,
      year: furniture.year,
      description: furniture.description,
      price: furniture.price,
      image: furniture.image,
      createdOn: new Date(),
      createdBy: furniture.createdBy,
      likes: [],
      reviews: []
    }

    if (furniture.material) {
      newFurniture.material = furniture.material
    }

    furnitureData[id] = newFurniture
  },
  all: (page, search) => {
    const pageSize = 10

    let startIndex = (page - 1) * pageSize
    let endIndex = startIndex + pageSize

    return Object
      .keys(furnitureData)
      .map(key => furnitureData[key])
      .filter(furniture => {
        if (!search) {
          return true
        }

        const furnitureMake = furniture.make.toLowerCase()
        const furnitureModel = furniture.model.toLowerCase()
        const searchTerm = search.toLowerCase()

        return furnitureModel.indexOf(searchTerm) >= 0 ||
        furnitureMake.indexOf(searchTerm) >= 0
      })
      .sort((a, b) => b.id - a.id)
      .slice(startIndex, endIndex)
  },
  findById: (id) => {
    return furnitureData[id]
  },
  addReview: (id, rating, comment, user) => {
    const review = {
      rating,
      comment,
      user,
      createdOn: new Date()
    }

    furnitureData[id].reviews.push(review)
  },
  allReviews: (id) => {
    return furnitureData[id]
      .reviews
      .sort((a, b) => b.createdOn - a.createdOn)
      .slice(0)
  },
  like: (id, user) => {
    const likes = furnitureData[id].likes

    if (likes.indexOf(user) >= 0) {
      return false
    }

    likes.push(user)

    return true
  },
  byUser: (user) => {
    return Object
      .keys(furnitureData)
      .map(key => furnitureData[key])
      .filter(furniture => furniture.createdBy === user)
      .sort((a, b) => b.id - a.id)
  },
  delete: (id) => {
    delete furnitureData[id]
  }
}
