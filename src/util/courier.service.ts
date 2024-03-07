const Courier = require('@trycourier/courier')

const courier = new Courier.CourierClient({ authorizationToken: "dk_prod_0G6FHQTP8AMHXJM150NJQGB1MEQQ" });

export const courierMessage = async(userId:string, title: string, body: string) => {

    // const userId = "bc66fe64-9f1a-4b5f-8f58-e3604348785b"
    // const title = "Hello!"
    // const body = "HAPPY INDEPENDENCE DAY!"

    const { requestId } = await courier.send({
    message: {
    to: {
        user_id: userId,
    },
    content: {
        title: title,
        body: body,
    },
    routing: {
        method: "single",
        channels: ["firebase-fcm"],
    },
    },
    });

 console.log(requestId)
}