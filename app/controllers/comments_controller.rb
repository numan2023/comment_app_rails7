class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @item = Item.find(params[:item_id])
    if @comment.save
        # CommentChannelを通して、@itemに紐づいた経路でJSにコメント・送信者のデータを送信
        CommentChannel.broadcast_to @item, { comment: @comment, user: @comment.user }

      # comment_channelを通して、コメント・送信者の情報をbroadcast(送信)する。
      # broadcast : サーバー(Rails)からクライアント側(JavaScript)へデータを送ること
        # ※以下の記述では商品に紐づいていないコメントも反映されてしまう（全てのブラウザで同じチャネルを使用することになる）
      # 削除）ActionCable.server.broadcast "comment_channel", {comment: @comment, user: @comment.user}
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:text).merge(user_id: current_user.id, item_id: params[:item_id])
  end
end
