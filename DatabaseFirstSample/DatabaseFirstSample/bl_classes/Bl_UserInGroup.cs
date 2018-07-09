using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseFirstSample.bl_classes
{
    [DataContract]
    [Serializable]
    class Bl_UserInGroup
    {
        [DataMember]
        public string userMail { get; set; }
        [DataMember]
        public int groupId { get; set; }
        [DataMember]
        public bool isAdministrator { get; set; }
        [DataMember]
        public string childFirstName { get; set; }
        [DataMember]
        public string childLastName { get; set; }
        [DataMember]
        public string nickname { get; set; }
        [DataMember]
        public Nullable<System.DateTime> child_born { get; set; }
        public Bl_UserInGroup(UserInGroup userInGroup)
        {
            this.userMail = userInGroup.userMail;
            this.groupId = userInGroup.groupId;
            this.isAdministrator = userInGroup.isAdministrator;
            this.childFirstName = userInGroup.childFirstName;
            this.childLastName = userInGroup.childLastName;
            this.nickname = userInGroup.nickname;
            this.child_born = userInGroup.child_born;
        }

        public Bl_UserInGroup()
        {
        }

        public List<Bl_UserInGroup> getUsersInGroup(UserInGroup[] usersInGroup)
        {
            List<Bl_UserInGroup> userInGroup = new List<Bl_UserInGroup>();
            foreach (var item in usersInGroup)
            {
                userInGroup.Add(new Bl_UserInGroup(item));
            }
            return userInGroup;
        }
        public List<BL_User> getUsersInGroupDetails(UserInGroup[] usersInGroup)
        {
            List<BL_User> userInGroupDetails = new List<BL_User>();
            foreach (var item in usersInGroup)
            {
                userInGroupDetails.Add(new BL_User(item.User));
            }
            return userInGroupDetails;
        }
        public Dictionary<Bl_UserInGroup,Bl_Group> getUsersInGroupDictionary(UserInGroup[] usersInGroup)
        {
            Dictionary<Bl_UserInGroup, Bl_Group> userInGroup = new Dictionary<Bl_UserInGroup, Bl_Group>();
            foreach (var item in usersInGroup)
            {
                userInGroup.Add(new Bl_UserInGroup(item), new Bl_Group(item.Group));
            }
            return userInGroup;
        }

    }
}
