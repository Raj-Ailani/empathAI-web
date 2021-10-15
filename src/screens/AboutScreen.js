import React from 'react'
import { Container } from 'reactstrap'

const AboutScreen = () => {
    return (
        <div>
            <Container id='about-cont'>
                <h3>
                    About Us
                </h3>
                <p>
                As we all know online shopping has increased many folds  and for any product to be a  success we need feedback of our 
                customers as to what they want ,what their needs are and how can we improve our product  to cater to  their never ending demands. 
                There is already a lot of customer data available and scrutinizing it in a correct and most efficient way will go a 
                long way in making any product yield the best possible outcome . 
                </p>
                <p>
                So what the problem is that although a lot of this information is already present but for a human mind to read all this information and process it will not only be time consuming but might also not be fruitful . 
                due to this  lack in  human capacity the gap btw a seller and its comsumer is increasing leading to negative branding of companies. 
                </p>
                <p>
                For  situations like this  our product will be useful.
                <strong>Empath AI</strong> as the name suggests will help in recognising its cusmers sentiments . it is an internet monitoring tool combined with advanced sentiment analysis 
                working together to protect your brand and help in solving all the problems i mentioned in the above slides
                </p>

                <h5>
                    Sentiment-Analysis
                </h5>
                <p>
                Sentiment analysis (also known as opinion mining or emotion AI) is the use of natural language processing, text analysis,
                computational linguistics, and biometrics to systematically identify, extract, quantify, and study affective states and 
                subjective information. Sentiment analysis is widely applied to voice of the customer materials such as reviews and survey 
                responses, online and social media, and healthcare materials for applications that range from marketing to customer service to
                 clinical medicine.
                </p>
                <p>
                Subjective and objective identification, emerging subtasks of sentiment analysis to use syntactic, semantic features, 
                and machine learning knowledge to identify a sentence or document are facts or opinions.
                    </p>
            </Container>
        </div>
    )
}

export default AboutScreen
