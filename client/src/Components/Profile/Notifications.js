import React from "react";
import { Query } from "react-apollo";
import { getNotifications } from "../../queries/profileQueries";
import Spinner from "../common/Spinner";
import Collapsible from "react-materialize/lib/Collapsible";
import CollapsibleItem from "react-materialize/lib/CollapsibleItem";
import Moment from "react-moment";
export default function Notifications() {
  return (
    <Query
      onCompleted={data => console.log(data)}
      onError={error => console.log(error)}
      query={getNotifications}
    >
      {({ data, loading, error }) => {
        return loading ? (
          <Spinner />
        ) : (
          <>
            <div className="container">
              <h4  className="blue-text lighten-2-text center-align" style = {{marginBottom : "50px"}}>Notification here</h4>
              <Collapsible accordion defaultActiveKey = {1}>
                <CollapsibleItem className = "blue-text" header="LIKED POSTS">
                  {data.getNotifications
                    .filter(notification => notification.type === "LikePost")
                    .map((notification, index) => (
                      <div key={index} style = {{fontWeight : "bold"}} className="text-black center-align">
                        {notification.text + " " }
                        <Moment durationFromNow>{Date(notification.date)}</Moment>
                      </div>
                    ))}
                </CollapsibleItem>
                <CollapsibleItem   className = "blue-text" header="CREATED POST">
                  {data.getNotifications
                    .filter(notification => notification.type === "createPost")
                    .map((notification, index) => (
                      <div style ={{fontWeight : "bold"}} key={index} className="text-blue lighten-2-text  center-align">
                        {notification.text + " "  } 
                        <Moment durationFromNow>{Date(notification.date)}</Moment>
                      </div>
                    ))}
                </CollapsibleItem>
                <CollapsibleItem  className = "blue-text" header="Profile VISITS">
                  {data.getNotifications
                    .filter(
                      notification => notification.type === "profileVisited"
                    )
                    .map((notification, index) => (
                      <div key={index} style ={{fontWeight : "bold"}}  className="text-blue lighten-2-text center-align">
                        {notification.text + " "  } 
                        <Moment durationFromNow>{Date(notification.date)}</Moment>
                      </div>
                    ))}
                </CollapsibleItem>
              </Collapsible>
            </div>
          </>
        );
      }}
    </Query>
  );
}
