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
    
    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            this.UserInGroups = new HashSet<UserInGroup>();
        }
    
        public string firstName { get; set; }
        public string lastName { get; set; }
        public byte[] profile_ { get; set; }
        public string mail { get; set; }
        public string password_ { get; set; }
        public string city { get; set; }
        public string streat { get; set; }
        public Nullable<int> build { get; set; }
        public Nullable<double> latitute { get; set; }
        public Nullable<double> longitude { get; set; }
    
        public virtual AdministratorSetting AdministratorSetting { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserInGroup> UserInGroups { get; set; }
    }
}
