/*var Model =  require('./model');
var Service =  require('./service');*/
//https://github.com/swashcap/file-uploads-and-hapi
import service from './service';
import Content from '@hapi/content';


/**
 * POST a Item
 */
exports.create = async (req, h) => {
    const payload = req.payload;
    const contentType = Content.type(req.headers['content-type']);
    //const my_req = new service.Payload(payload);
    //const chunk = service.Payload(payload);
    const result = await service.interceptor(req.payload,contentType.boundary);
    //return result;*/
    return 'Received your data hehel';
}

/**
 * List Items
 */
exports.list = (req, h) => {
    return 'get all media';
    /* return Model.find({}).exec().then((item) => {
         return item;
     }).catch((err) => {
         return { err: err };
     });*/
}



/**
 * Get Item by ID
 */
exports.get = (req, h) => {
    return 'get media';
    /*return Model.findById(req.params.id).exec().then((item) => {
        if(!item) return { message: 'Item not found' };
        return item;
    }).catch((err) => {
        return { err: err };
    });*/
}

/**
 * PUT | Update Item by ID
 */
exports.update = (req, h) => {
    return 'update media'
    /*return  Model.findById(req.params.id).exec().then((item) => {
        if (!item) return { err: 'Item not found' };
        item = req.payload;
        item.save();
        return { message: "Item update successfully", item };
    }).catch(err=>{
        return {err:err}
    })*/
}

/**
 * Delete Item by ID
 */
exports.remove = (req, h) => {
    return "remove media"
    /*return Model.findById(req.params.id).exec().then((item)=>{
        if (!item) return { err: 'item not found' };
        item.remove();
        return { message: "Item remove successfully" };
    }).catch((err) => {
        return { err: err };
    });*/
}
