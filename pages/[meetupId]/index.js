import { Fragment } from "react";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import Head from "next/head";

function DetailsPage(props) {
    return (
        <Fragment>
            <Head>
                <title>Meetup | Details</title>
                <metadata name="description" content='Browse Details of wonderful destinations for vacations or weading' />
            </Head>
            <MeetupDetails
                image={props.meetups.image}
                title={props.meetups.title}
                address={props.meetups.address}
            />
        </Fragment>
    )
}

export async function getStaticPaths() {
    const response = await fetch("https://react-prep-99c9e-default-rtdb.firebaseio.com/meetups.json");
    if (!response.ok) {
        throw new Error("Cant Fetch The Data!")
    }

    const data = await response.json();
    let loadedIds = []
    for (const key in data) {
        loadedIds.push({
            params: {
                meetupId: key
            }
        })
    }

    return {
        fallback: false,
        paths: loadedIds
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const response = await fetch("https://react-prep-99c9e-default-rtdb.firebaseio.com/meetups.json");
    if (!response.ok) {
        throw new Error("Cant Fetch The Data!")
    }

    const data = await response.json();

    let loadedMeetups = [];
    for (const key in data) {
        loadedMeetups.push({ id: key, ...data[key] })
    }

    const loadedMeetup = loadedMeetups.find(meet => meet.id === meetupId);

    return {
        props: {
            meetups: loadedMeetup
        },
        revalidate: 1
    }
}

export default DetailsPage;