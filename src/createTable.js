//
const createDocs = function () {
    let $sql = `
    CREATE TABLE docs (
      id int(11) NOT NULL AUTO_INCREMENT,
      author varchar(255) DEFAULT NULL,
      updatetime datetime DEFAULT NULL,
      title text CHARACTER SET utf8 COLLATE utf8_general_ci,
      keywords text CHARACTER SET utf8 COLLATE utf8_general_ci,
      docs text CHARACTER SET utf8 COLLATE utf8_general_ci,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `
};

//
const createComments = function () {
    let $sql = `
    CREATE TABLE comments (
      id int(11) NOT NULL AUTO_INCREMENT,
      author varchar(255) DEFAULT NULL,
      updatetime datetime DEFAULT NULL,
      comment text CHARACTER SET utf8 COLLATE utf8_general_ci,
      docsId int(11) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `
};