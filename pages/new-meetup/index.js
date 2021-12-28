import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import { useRouter } from "next/router"
import Head from "next/head"


function NewMeetup() {
    const router = useRouter();

    async function addMeetupHandler(meetup) {
        try {
            const response = await fetch("https://react-prep-99c9e-default-rtdb.firebaseio.com/meetups.json", {
                method: 'POST',
                body: JSON.stringify(meetup),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error("Cant Add This Meetup!");
            }
        } catch (error) {
            console.log(error)
        }
        router.push("/");
    };

    return (
        <Fragment>
            <Head>
                <title>Add Meetups</title>
                <metadata name="description" content="Add a new Meetup destination" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
}

export default NewMeetup;