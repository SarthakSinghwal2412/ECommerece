class ApiFeatures{
    constructor(query,queryStr){
        this.query =  query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex : this.queryStr.keyword,
                $options : "i",
            }
        } : {}; 
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryStr = {...this.queryStr}
        // removing fields

        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key) => delete queryStr[key])

        // filter for price and ratings 

        let queryCopy = JSON.stringify(queryStr);
        queryCopy = queryCopy.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);
        this.query = this.query.find(JSON.parse(queryCopy));
        return this;
        
    }
    pagination(resultPerPage){
        const currPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage*(currPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;

    }
}
module.exports = ApiFeatures;