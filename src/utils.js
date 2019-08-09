import mysql from 'mysql';
import {mysqlConfig} from './mysql_config';
const pool = mysql.createPool(mysqlConfig);

// 解析上下文里node原生请求的POST参数
export function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data
            });
            ctx.req.addListener("end", function () {
                let parseData = parseQueryStr(postdata);
                try {
                    resolve(JSON.parse(parseData[0]));
                } catch (e) {
                    reject(e);
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成JSON
export function parseQueryStr(queryStr) {
    // let queryData = {};
    // let queryStrList = queryStr.split('&');
    // for (let [index, queryStr] of queryStrList.entries()) {
    //     let itemList = queryStr.split('=');
    //     queryData[itemList[0]] = decodeURIComponent(itemList[1])
    // }
    return queryStr.split('&')
}

//获取文章列表数据
export const queryDocs = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    })
};
//插入文章数据
export const insertDocs = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve({
                status: 200,
                success: true,
                id: results.insertId
            });
        });
    })
};

//获取文章详情数据
export const queryDocsDetail = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    })
};

//搜索文章
export const searchDocs = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    })
};

//更新指定文章数据
export const updateDocs = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve({
                status: 200,
                success: true
            });
        });
    })
};

//插入指定文章id的评论数据
export const insertDocsComment = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve({
                status: 200,
                success: true
            });
        });
    })
};

//获取指定文章id的评论数据
export const getDocsComment = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    })
};