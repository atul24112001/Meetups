import { Fragment } from "react";
import classes from "./MeetupDetails.module.css"
import Card from "../ui/Card";

function MeetupDetails(props) {
    return (
        <Fragment>
            <div className={classes.item}>
                <Card>
                    <div className={classes.image}>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className={classes.content}>
                        <h3>{props.title}</h3>
                        <address>{props.address}</address>
                    </div>
                </Card>
            </div>
        </Fragment>
    );
}

export default MeetupDetails