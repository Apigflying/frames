import fetch from 'fetch'
//请求的方式
const method = 'GET';
//请求被代理的路径
const proxy = process.env.IS_DEV ? '/cgi-bin' : '';

//获取openId
export function getMusicData() {
  return fetch({
    method,
    url: `${proxy}/musicu.fcg?callback=recom41235384250675633&g_tk=5381&jsonpCallback=recom41235384250675633&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B"comm"%3A%7B"ct"%3A24%7D%2C"category"%3A%7B"method"%3A"get_hot_category"%2C"param"%3A%7B"qq"%3A""%7D%2C"module"%3A"music.web_category_svr"%7D%2C"recomPlaylist"%3A%7B"method"%3A"get_hot_recommend"%2C"param"%3A%7B"async"%3A1%2C"cmd"%3A2%7D%2C"module"%3A"playlist.HotRecommendServer"%7D%2C"playlist"%3A%7B"method"%3A"get_playlist_by_category"%2C"param"%3A%7B"id"%3A8%2C"curPage"%3A1%2C"size"%3A40%2C"order"%3A5%2C"titleid"%3A8%7D%2C"module"%3A"playlist.PlayListPlazaServer"%7D%2C"new_song"%3A%7B"module"%3A"QQMusic.MusichallServer"%2C"method"%3A"GetNewSong"%2C"param"%3A%7B"type"%3A0%7D%7D%2C"new_album"%3A%7B"module"%3A"QQMusic.MusichallServer"%2C"method"%3A"GetNewAlbum"%2C"param"%3A%7B"type"%3A0%2C"category"%3A"-1"%2C"genre"%3A0%2C"year"%3A1%2C"company"%3A-1%2C"sort"%3A1%2C"start"%3A0%2C"end"%3A39%7D%7D%2C"toplist"%3A%7B"module"%3A"music.web_toplist_svr"%2C"method"%3A"get_toplist_index"%2C"param"%3A%7B%7D%7D%2C"focus"%3A%7B"module"%3A"QQMusic.MusichallServer"%2C"method"%3A"GetFocus"%2C"param"%3A%7B%7D%7D%7D`,
  })
}