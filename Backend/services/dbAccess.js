class dbAccess{
    async create(element, values){
        try{
            await element.create(values);
            return true;
        }catch(err){
            console.log(err);
            return err.original || err;
        }
    }
    async read(element, field, key){
        const whereClause = {};
        whereClause[field] = key;
        try{
            const result = await element.findOne({
                where: whereClause
            });
            if(result) return result;
            return false;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async update(element, field, key, newValues){
        const whereClause = {};
        whereClause[field] = key;
        try{
            const result = await element.update(newValues, {
                where: whereClause
            });
            if(result[0] > 0) return true;
            return false;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async delete(element, field, key){
        let whereClause = {};
        whereClause[field] = key;
        try{
            const result = await element.destroy({
                where: whereClause
            });
            if(result > 0) return true;
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    async find(element, field, key){
        const whereClause = {};
        whereClause[field] = key;
        console.log(whereClause);
        try{
            const result = await element.findAll({
                where: whereClause
            });
            if(result) return result;
            return false;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async findClause(element, whereClause) {
    try {
        const result = await element.findAll({
            where: whereClause
        });

        return result.length > 0 ? result : false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

    async findAny(element){
        try{
            const result = await element.findAll();
            if(result) return result;
            return false;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async findAllOrdered(element, whereClause = {}, order = [], limit = null, include = []) {
        try {
            const options = { where: whereClause, order, include };
            if (limit) options.limit = limit;
            const result = await element.findAll(options);
            return result || [];
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async findPaginated(element, whereClause = {}, page = 1, limit = 10, include = []) {
        const offset = (page - 1) * limit;
        try {
            const result = await element.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                include
            });
            return {
                total: result.count,
                pages: Math.ceil(result.count / limit),
                currentPage: page,
                data: result.rows
            };
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = new dbAccess();