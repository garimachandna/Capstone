import pickle
import sys
import joblib
from googletrans import Translator

def translate(data):
    translator = Translator()
    translation= translator.translate(data).text
    return translation


#main function
if __name__ == "__main__":
    
    model = pickle.load(open("model.pkl", 'rb'))
    complaint= sys.argv[1]

    # use vectorizer.pkl to vectorize the complaint
    # use model.pkl to predict the probability
    # return the probability to the frontend
    # print the probability to the console
    # print("complaint: ", complaint)
    # print("probability: ", prob)


    # vectorizer = pickle.load(open("../../model/full data/vectorizer.pkl", 'rb'))
    # complaint = vectorizer.transform([complaint])

    #load vectorizer using joblib
    vectorizer = joblib.load("vectorizer.pkl")

    complaint= translate(complaint)
    complaint = vectorizer.transform([complaint])
    complaint = complaint.toarray()

    # print("\ncomplaint: ", complaint)
    prob = model.predict(complaint)

    # print("translated complaint: ", complaint)
    print(prob)
