//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseFirstSample
{
    using System;
    using System.Collections.Generic;
    
    public partial class ThisDay
    {
        public int id { get; set; }
        public int groupId { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string color { get; set; }
        public string icon { get; set; }
        public Nullable<System.DateTime> date { get; set; }
    
        public virtual Group Group { get; set; }
    }
}
