const User = require("../models/User");

module.exports = {
  // 用戶控制器方法
  getUsers: async (req, res) => {
    try {
      
      res.render("test", { users });
    } catch (error) /* 錯誤處理 */ {
      // 如果發生錯誤，它會將錯誤記錄到控制台
      console.error(error);
      // 發送 500 狀態代碼和「內部伺服器錯誤」訊息作為回應。
      res.status(500).send("Internal server error");
    }
  }
};
