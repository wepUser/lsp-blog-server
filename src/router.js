import {
    queryDocs,
    parsePostData,
    insertDocs,
    queryDocsDetail,
    searchDocs,
    updateDocs,
    insertDocsComment,
    getDocsComment
} from './utils';

export const handleRouter = function (router) {
    //获取文章列表数据
    router.post('/getDocs', async (ctx, next) => {
        let data = await parsePostData(ctx);
        let {docsClass} = data.params;
        let sql = docsClass === 'all' ? 'SELECT * from  docs order by updatetime desc' : `SELECT * from  docs WHERE keywords like '%${docsClass}%' order by updatetime desc`;
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

    //搜索文章
    router.post('/searchDocs', async (ctx, next) => {
        let data = await parsePostData(ctx);
        let {searchInfo} = data.params;
        let sql = `SELECT * from  docs WHERE docs like '%${searchInfo}%' order by updatetime desc`;
        ctx.status = 200;
        ctx.body = await searchDocs(sql);
    });

    //更新指定文章
    router.post('/updateDocs', async (ctx, next) => {
        let data = await parsePostData(ctx);
        let {docs, title, keywords, id} = data.params;
        let sql = `UPDATE docs SET docs="${docs}",title="${title}",keywords="${keywords}",updatetime=NOW() WHERE id=${id}`;
        ctx.status = 200;
        ctx.body = await updateDocs(sql);
    });

    //插入指定文章id的评论数据
    router.post('/saveCommentDocs', async (ctx, next) => {
        let data = await parsePostData(ctx);
        let {docsId, comment} = data.params;
        let sql = `INSERT INTO comments ( docsId,comment,updatetime) VALUES ("${docsId}","${comment}",NOW());`;
        ctx.status = 200;
        ctx.body = await insertDocsComment(sql);
    });

    //获取指定文章id的评论数据
    router.post('/getCommentDocs', async (ctx, next) => {
        let data = await parsePostData(ctx);
        let {docsId} = data.params;
        let sql = `SELECT * from  comments WHERE docsId=${docsId} order by updatetime desc;`;
        ctx.status = 200;
        ctx.body = await getDocsComment(sql);
    });
};