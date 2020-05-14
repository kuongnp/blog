var Model =  require('./model');
var Service =  require('./service');

/**
 * List Items
 */
exports.index = (req,h) => {
    return 'Welcome menu api';
}

exports.list = (req, h) => {
    return Model.Menu.find({}).populate('items').exec().then((item) => {
        return item;
    }).catch((err) => {
        return { err: err };
    });
}

/**
 * Get Item by ID
 */
exports.get = (req, h) => {
    return Model.Menu.findById(req.params.id).exec().then((item) => {
        if(!item) return { message: 'Item not Found' };
        return item;
    }).catch((err) => {
        return { err: err };
    });
}


/**
 * POST a Item
 */
exports.create = (req, h) => {
    const menu = {
        name: req.payload.name,
        slug: req.payload.slug
    };
    let items = req.payload.items;
    if(items) {
        return Model.Item.create(items).then(result=>{
            let ids = result.map(item=>item._id);
            menu.items = ids;
            return Model.Menu.create(menu);
        }).then(menu=>{
            return {message: "Menu created successfully", menu}
        })
            .catch(err=>{
                return {err:err}
            })
    }else {
        return Model.Menu.create(menu).then(menu=>{
            return {message: "Menu created successfully", menu}
        }).catch(err=>{
            return {err:err}
        });
    }
}

/**
 * PUT | Update Item by ID
 */
exports.update = (req, h) => {
    return  Model.Menu.findById(req.params.id).exec().then(menu => {
        if (!menu) return { err: 'Item not found' };
        menu.name = req.payload.name;
        menu.slug = req.payload.slug;
        let items = req.payload.items;

        console.log(items);
        menu.items = [];
        if(items) {
            let items_promise = items.map(item=>{
                if(item._id) {
                    return Model.Item.findById(item._id).exec().then(rs=>{
                        rs.name = item.name;
                        rs.link = item.link;
                        rs.save();
                        return rs;
                    }).catch(err=>{
                        return {err:err}
                    })
                }else {
                    let new_item = {
                        name:item.name,
                        link:item.link
                    }
                    return Model.Item.create(new_item).then(rs=>{
                        return rs;
                    }).catch(err=>{
                        return {err:err}
                    })
                }
            })
            Promise.all(items_promise).then(function(items) {
                let ids = items.map(item=>item._id);
                menu.items = ids;
                return menu.save();
            }).then(menu=>{
                return { message: "Menu update successfully", menu };
            })
        }else {
            menu.save();
            return { message: "Menu update successfully", menu };
        }

    }).catch(err=>{
        return {err:err}
    })
}

/**
 * Delete Item by ID
 */
exports.remove = (req, h) => {
    return Model.Menu.findById(req.params.id).exec().then((item)=>{
        if (!item) return { err: 'item not found' };
        item.remove();
    }).then(() => {
        return { message: "Item remove successfully" };
    }).catch((err) => {
        return { err: err };
    });
}

//get item
exports.get_item = (req, h) => {
    return Model.Item.findById(req.params.id).populate('sub').exec().then((item) => {
        if(!item) return { message: 'Item not Found' };
        return item;
    }).catch((err) => {
        return { err: err };
    });
}

exports.update_item = (req, h) => {
    return  Model.Item.findById(req.params.id).exec().then(item => {
        if (!item) return { err: 'Item not found' };
        item.name = req.payload.name;
        item.link = req.payload.link;
        let items = req.payload.items;
        item.sub = [];
        if(items) {
            let items_promise = items.map(item=>{
                if(item._id) {
                    return Model.Item.findById(item._id).exec().then(rs=>{
                        rs.name = item.name;
                        rs.link = item.link;
                        rs.save();
                        return rs;
                    }).catch(err=>{
                        return {err:err}
                    })
                }else {
                    let new_item = {
                        name:item.name,
                        link:item.link
                    }
                    return Model.Item.create(new_item).then(rs=>{
                        return rs;
                    }).catch(err=>{
                        return {err:err}
                    })
                }
            })
            Promise.all(items_promise).then(function(items) {
                let ids = items.map(item=>item._id);
                item.sub = ids;
                return item.save();
            }).then(item=>{
                return { message: "Menu update successfully", item };
            })
        }else {
            item.save();
            return { message: "Menu update successfully", item };
        }

    }).catch(err=>{
        return {err:err}
    })
}

exports.remove_item = (req, h) => {
    return Model.Item.findById(req.params.id).exec().then((item)=>{
        if (!item) return { err: 'item not found' };
        item.remove();
    }).then(() => {
        return { message: "Item remove successfully" };
    }).catch((err) => {
        return { err: err };
    });
}
