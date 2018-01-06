using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DatabaseFirstSample.bl_classes
{
    [Serializable]
    [DataContract]
    public class Result<T>
    {
        [DataMember]
        public bool Success { get; set; }
        [DataMember]
        public int ErrorMessage { get; set; }
        [DataMember]
        public T returnObject { get; set; }
        public Result(bool seccess,int errorMessage)
        {
            this.Success = Success;
            this.ErrorMessage = errorMessage;
        }
        public Result(bool success, T returnObject)
        {
            this.Success = success;
            this.returnObject = returnObject;
        }
        public Result(bool success, T returnObject,int errorMessage)
        {
            this.Success = success;
            this.returnObject = returnObject;
            this.ErrorMessage = errorMessage;
        }
    }
}
