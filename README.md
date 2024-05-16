db.collection.aggregate([
  {
    $group: {
      _id: "$status",
      users: { $push: "$$ROOT" }
    }
  },
  {
    $project: {
      _id: 0,
      status: "$_id",
      users: 1
    }
  }
])
