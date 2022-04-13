const { Post } = require('../models');

const postSeed = [
    {
        "title": "What to do about covid isolation",
        "post_text": "Sedentary behaviour and low levels of physical activity can have negative effects on the health, well being and quality of life of individuals. Self-quarantine can also cause additional stress and challenge the mental health of citizens. Physical activity and relaxation techniques can be valuable tools to help you remain calm and continue to protect your health during this time. WHO recommends 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity physical activity per week, or a combination of both.",
        "user_id": 5
    },
    {
        "title": "Best series for this weekend",
        "post_text": "Bridgerton:  Watched for 53.02 million hours this week. Watched for 26.51 million hours this week.",
        "user_id": 3
    },
    {
        "title": "Best pizza logcation in Addison, TX",
        "post_text": "Zalats Pizza in Addison: Awesome pizza! Stays open later. Staff is super helpful with suggestions or any questions you may have. They offer convenient carryout through a walk up window. I had the 18 inch Zealot and it was absolutely amazing. (I also ordered before close so that’s really saying something.) The pizza was the perfect texture and the crust was crunchy and scrumptious! This place was awesome!",
        "user_id": 1
    },
    {
        "title": "Best movie of 2022, so far...",
        "post_text": "Writing with Fire:  Critics Consensus: Writing with Fire pays stirring tribute to the power of journalism -- and presents a chilling glimpse of the forces aligned against it. Synopsis: In a cluttered news landscape dominated by men emerges India's only newspaper run by Dalit women.",
        "user_id": 2
    },
];

const postInfo = () => Post.bulkCreate(postSeed);

module.exports = postInfo;