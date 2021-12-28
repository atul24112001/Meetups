import { Fragment } from "react";
import Head from "next/head"
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>Meetups</title>
                <metadata name="description" content="Browse a list of wonderful destinations for vacations" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

// export async function getSe() {
//     return {
//         props: {
//             meetups: DUMMY_DATA
//         }
//     }
// }

export async function getStaticProps() {
    const response = await fetch("https://react-prep-99c9e-default-rtdb.firebaseio.com/meetups.json");
    if (!response.ok) {
        throw new Error("Cant Fetch The Data!")
    }

    const data = await response.json();
    let loadedMeetups = []
    for (const key in data) {
        loadedMeetups.push({ id: key, ...data[key] })
    }

    return {
        props: {
            meetups: loadedMeetups,
        },
        revalidate: 1
    }
}

export default HomePage;