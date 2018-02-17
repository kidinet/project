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
        private bool v1;
        private User user;
        private int v2;

        [DataMember]
        public bool Success { get; set; }
        [DataMember]
        public string ErrorMessage { get; set; }
        [DataMember]
        public T returnObject { get; set; }
        public Result(string errorMessage)
        {
            this.Success = Success;
            this.ErrorMessage = errorMessage;
        }
        public Result(bool success, T returnObject)
        {
            this.getType(returnObject);
            this.Success = success;
            this.returnObject = returnObject;
        }
        public Result(bool success, T returnObject, string errorMessage)
        {
            this.Success = success;
            this.returnObject = returnObject;
            this.ErrorMessage = errorMessage;
        }

        public Result(bool v1, User user, int v2)
        {
            this.v1 = v1;
            this.user = user;
            this.v2 = v2;
        }

        public Result()
        {
        }

        public T getType(T returnObject)
        {
            Type obj = returnObject.GetType();
            PropertyInfo[] propertyInfos = returnObject.GetType().GetProperties();
            returnObject.GetType().GetProperties().Where(m =>
            m.PropertyType.IsGenericType &&
            m.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>)).ToList();
            foreach (PropertyInfo m in returnObject.GetType().GetProperties())
            {
                if (m.PropertyType.IsGenericType && m.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>))
                {
                    m.SetValue(returnObject, null);
                }
            }
            return returnObject;
        }
    }
}

