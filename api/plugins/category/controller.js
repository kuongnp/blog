var Model =  require('./model');
var Service =  require('./service');

/**
 * List Items
 */
exports.list = (req, h) => {
    return Model.find({}).exec().then((item) => {
        return item;
    }).catch((err) => {
        return { err: err };
    });
}

/**
 * Get Item by ID
 */
exports.get = (req, h) => {
    return Model.findById(req.params.id).exec().then((item) => {
        if(!item) return { message: 'Item not found' };
        return item;
    }).catch((err) => {
        return { err: err };
    });
}

/**
 * Get Item by Slug
 */
exports.getBySlug = (req, h) => {
    return Model.find({slug:req.params.slug}).exec().then((item) => {
        if(!item) return { message: 'Item not found' };
        return item;
    }).catch((err) => {
        return { err: err };
    });
}


/**
 * POST a Item
 */
exports.create = (req, h) => {
    let item = req.payload;
    return Model.create(item).then((item)=>{
        return {message: "Item created successfully", item}
    }).catch(err=>{
        return {err:err}
    });
}

/**
 * PUT | Update Item by ID
 */
exports.update = (req, h) => {
    return  Model.findById(req.params.id).exec().then((item) => {
        if (!item) return { err: 'Item not found' };
        item = req.payload;
        item.save();
        return { message: "Item update successfully", item };
    }).catch(err=>{
        return {err:err}
    })
}

/**
 * Delete Item by ID
 */
exports.remove = (req, h) => {
    return Model.findById(req.params.id).exec().then((item)=>{
        if (!item) return { err: 'item not found' };
        item.remove();
        return { message: "Item remove successfully" };
    }).catch((err) => {
        return { err: err };
    });
}
