import {queryDocs, parsePostData, insertDocs, queryDocsDetail} from './utils';

export const handleRouter = function (router) {
    //获取文章列表数据
    router.post('/getDocs', async (ctx, next) => {
        let data = await parsePostData(ctx);
        let {docsClass} = data.params;
        let sql = docsClass === 'all' ? 'SELECT * from  docs' : `SELECT * from  docs WHERE keywords like '%${docsClass}%'`;
        ctx.status = 200;
        ctx.body = await queryDocs(sql);
    });

    //保存新建文章数据
    router.post('/saveDocs', async (ctx, next) => {
        let data = await parsePostData(ctx);
        let {docs, title, keywords} = data.params;
        let sql = `INSERT INTO docs ( docs,title,keywords,updatetime) VALUES ("${docs}","${title}","${keywords}",NOW());`;
        ctx.status = 200;
        ctx.body = await insertDocs(sql);
    });

    //获取文章详情数据
    router.post('/getDocsDetail', async (ctx, next) => {
        let data = await parsePostData(ctx);
        let {id} = data.params;
        let sql = `SELECT * from  docs WHERE id=${id}`;
        ctx.status = 200;
        ctx.body = await queryDocsDetail(sql);
    });
};