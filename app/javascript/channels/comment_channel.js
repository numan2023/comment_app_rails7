import consumer from "channels/consumer"

// JSで情報を受け取る
// 詳細ページのURLに、items/数字が含まれるため、正規表現で表し、条件分岐を行う。
  // location:ブラウザのwindowオブジェクトの一部で現在のページのURLに関する情報を含む
  // pathname:locationオブジェクトのpathnameプロパティは、URLのドメインに続くパス(ex 'https://example.com/path/to/page'の'/path/to/page')を表す
  // match()は文字列に対して使用されるJavaScriptのメソッド、指定された正規表現に一致する部分を探す
  // '/\/items\/\d/'：'\/items\/'は'/items/'という文字列を意味する。'/'は正規表現で特別な意味を持つ、バックスラッシュ'\'でエスケープされる。'\d'は任意の1桁の数字を意味
  // 要するに、URLのパス部分が'/items/'に続いて１桁の数字があるパターン(ex '/items/1')に一致するかどうかをチェック。2桁以上の数字にはマッチしない（2桁以上は\dの後に'+'を追加する-> + : 1回以上の繰り返し）。
if(location.pathname.match(/\/items\/\d/)){
  
// 以下を追加
  consumer.subscriptions.create({
    channel: "CommentChannel",
    item_id: location.pathname.match(/\d+/)[0]
  }, {
    
  // どのチャネルを使用するかの定義
  // 削除）consumer.subscriptions.create("CommentChannel", {
    connected() {
      // Called when the subscription is ready for use on the server
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      // 受け取ったコメントの情報を画面に表示
      const html = `
        <div class="comment">
          <p class="user-info">${data.user.nickname}: </p>
          <p>${data.comment.text}</p>
        </div>`
      const comments = document.getElementById("comments")
      comments.insertAdjacentHTML('beforeend', html)
      const commentForm = document.getElementById("comment-form")
      commentForm.reset();
    }
  })
}