using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace WebApi.Controllers
{
    
    public class BaseController : ApiController
    {
        protected HttpResponseMessage ResponseOK(object obj)
        {

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(obj.ToJson());
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");
            return response;
        }


        protected HttpResponseMessage ResponseError(string obj)
        {

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
            response.Content = new StringContent(obj);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");
            return response;
        }

        //protected HttpResponseMessage getMethod(string url)
        //{
        //    HttpClient queryClient = new HttpClient();
        //    string baseUrl = ConfigurationManager.AppSettings["baseUrl"];
        //    string restQuery = baseUrl + url;
        //    HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, restQuery);
        //    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        //    //call endpoint async
        //    HttpResponseMessage response = queryClient.SendAsync(request).Result;
        //    return response;
        //}
    }
    public static class DynamicExtentions
    {
        public static string ToJson(this object value)
        {
            return JsonConvert.SerializeObject(value);
        }
    }
}
