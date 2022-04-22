import axios from "axios";


class CallApi {
    Site = 'http://atyourdoorstep-pk.herokuapp.com/api/';


    async getData({apiUrl}) {
        let resp = await axios.get(this.Site+apiUrl);
        return resp.data;
    }

    async postData({data, apiUrl}) {
        let res = await axios.post(this.Site+apiUrl, data).then(
            res=>{
                return res.data;
            }
        ).catch(
            (error)=>
            {
                const resp=error.response.data
                return resp
            }
        )
        return res;

    }
}
export default CallApi
//
//     Uri fullUrl = Uri.parse(_url + apiUrl + await _getToken());
//     var resp=await http.post(
//         fullUrl,
//         body: jsonEncode(data),
//     headers: _setHeaders()
// );
//     return resp;
// getData(apiUrl) async {
//     //_url +
//     Uri fullUrl = Uri.parse(_url +apiUrl);
//     var resp=await http.get(
//         fullUrl,
//         headers: _setHeaders()
// );
//     return resp;
//     if (resp.statusCode == 200) {
//         String data = resp.body;
//         //print('post resp: '+data.toString());
//         return jsonDecode(data);
//     } else {
//         print(resp.statusCode);
//     }
//
//     return {'Error':'Failed to get Date from provided URL'};
// }
// uploadFile(file,Map<String,dynamic> data,apiUrl) async
// {
//     Dio dio = new Dio();
//     String fileName = file.path.split('/').last;
//     data['image']= await MultipartFile.fromFile(file.path, filename:fileName);
//     FormData fd=new FormData.fromMap(data);
//     try {
//         var response = await dio.post(
//             _url + apiUrl + await _getToken(), data: fd);
//         print(response.toString());
//         return response;
//     }
//     catch(e)
//     {
//         if (e is DioError) {
//         return e.response;
//     }
//         return
//         {
//             'success':false,
//             'message':'Some error occurred',
//         };
//     }
// }
//
//
// _setHeaders() => {
//     'Content-type' : 'application/json',
//         'Accept' : 'application/json',
// };
//
// _getToken() async {
//     SharedPreferences localStorage = await SharedPreferences.getInstance();
//     var token = localStorage.getString('token');
//     // if(token!.isEmpty)
//     //   {
//     //     return '';
//     //   }
//     return '?token=$token';
// }
