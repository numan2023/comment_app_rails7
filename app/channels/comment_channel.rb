class CommentChannel < ApplicationCable::Channel
  def subscribed
    @item = Item.find(params[:item_id])
    stream_for @item # @itemに関連したデータの経路を指定

    # stream_fromメソッド：サーバーとクライアントを関連づけるメソッド / comment_channelを通じて情報をやり取り
    # 削除）stream_from "comment_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
