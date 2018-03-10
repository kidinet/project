using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Reflection;

namespace DatabaseFirstSample.bl_classes
{
    [Serializable]
    [DataContract]
    public class Result<T>
    {
        
        private string message;
        private bool v;
        private Bl_Group bl_Group;

        [DataMember]
        public bool Success { get; set; }
        [DataMember]
        public string ErrorMessage { get; set; }
        [DataMember]
        public T returnObject { get; set; }
        public Result(bool Success,string errorMessage)
        {
            this.Success = Success;
            this.ErrorMessage = errorMessage;
        }
        public Result(bool success, T returnObject)
        {
            this.returnObject = returnObject;
            this.Success = success;
        }
        public Result(bool success, T returnObject, string errorMessage)
        {
            this.Success = success;
            this.returnObject = returnObject;
            this.ErrorMessage = errorMessage;
        }

        public Result()
        {
        }

        public Result(bool v)
        {
            this.v = v;
        }

        public T getType(T returnObject)
        {
            Type obj = returnObject.GetType();
           
            foreach (PropertyInfo m in returnObject.GetType().GetProperties())
            {
                if (m.PropertyType.IsGenericType && m.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>))
                {
                    m.SetValue(returnObject,null,null);
                }
            } 
            return returnObject;
        }
    }
}

