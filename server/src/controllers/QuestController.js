import db from "../database/index.js";
import Stack from "../struct/Stack.js";

class QuestController {

  constructor() {
    this.QuestionStack = new Stack();

    this.questions = this.questions.bind(this);
    this.answers = this.answers.bind(this);
  }

  async questions(req, res) {
    try {
      const result = await db('question')
        .join('alternative', 'question.id_question', '=', 'alternative.id_question')
        .select('question.id_question',
          'question.question_enunciation',    
          'alternative.id_alternative',
          'alternative.alternative_value',
          'alternative.correct'
        );

      const resultMap = result.reduce((result, row) => {
        result[row.id_question] = result[row.id_question] || {
          ...row,
          alternatives: []
        };

        result[row.id_question].alternatives.push({
          'id_alternative': row.id_alternative,
          'alternative_value': row.alternative_value,
          'correct': row.correct
        });

        delete result[row.id_question].id_alternative;
        delete result[row.id_question].alternative_value;
        delete result[row.id_question].correct;

        return result;
      }, {});

      const questionsList = Object.values(resultMap);

      console.log(questionsList.length);

      for (let i = 0; i < questionsList.length; i++) {
        const questionObject = {
          ...questionsList[i],
          'userAnswer': -1,
          'pontuation': -1
        };

        this.QuestionStack.add(questionObject);
      }

      let returnedData = [];
     
      for (let i = 0; i <= this.QuestionStack.length(); i++) {
        const question = this.QuestionStack.pop();
        returnedData.push(question);
      }

      res.status(200).json({ 'data': returnedData });
    } catch (error) {
      res.status(400).json({ 
        'message': 'ocorreu um erro ao executar a operação',
        'erro': error
      });

      console.log(error);
    }
  }

  async answers(req, res) {
    const { stack } = req.body;

    let hits = 0;

    let alternativeArray = [];

    for (let i = 0; i < stack.length; i++) {
      const answeredAlternative = stack[i].alternatives.filter((alternative) => {
        return alternative.alternative_value == stack[i].userAnswer
      });
     
      alternativeArray.push(answeredAlternative[0].id_alternative);
    }

    try {

      const answer = await db("alternative")
        .whereIn('id_alternative', alternativeArray)
        .select('id_alternative', 'correct');

      for(let alt of answer) {
        if(alt.correct) {
          hits += 1;
        }
      }

      console.log("acertos: " + hits);

    } catch (error) {
      console.log(error);
    }
  }
}

export default QuestController;
