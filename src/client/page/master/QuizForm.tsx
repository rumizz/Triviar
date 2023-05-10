import { FC, useEffect, useState } from "react";
import Loading from "src/client/component/Loading";
import Editor from "src/client/page/master/Editor";
import { useEditor } from "src/client/hook/useEditor";
import { mockQuiz } from "src/server/service/Game";
import { Quiz } from "src/server/types/Quiz";
import { Question } from "src/server/types/Question";
import QuestionsEditor from "./QuestionsEditor";
import { useParams } from "react-router-dom";
import { proxyClient } from "src/client/util/proxyClient";

const QuizForm: FC<{ isNew?: boolean }> = ({ isNew }) => {
  const [status, setStatus] = useState<
    "saved" | "unsaved" | "loading" | "error"
  >(isNew ? "saved" : "loading");
  const { quizId } = useParams();
  const [quiz, editorFactory, setQuiz] = useEditor<Quiz | null>(
    isNew ? new Quiz() : mockQuiz
  );

  useEffect(() => {
    if (quizId) {
      proxyClient.quiz.get
        .query(quizId)
        .then((quiz) => {
          setQuiz(quiz);
          setStatus("saved");
        })
        .catch(() => setStatus("error"));
    }
  }, [quizId]);

  useEffect(() => {
    console.log(quiz);
  }, [quiz]);

  if (status === "loading" || quiz == null) return <Loading />;

  if (status === "error") return <div>error</div>;

  return (
    <main className="bg-white absolute inset-0 flex flex-col gap-4 p-4">
      <h1 className="font-bold text-3xl text-left w-full">Quiz editor</h1>
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <Editor label="Title" {...editorFactory<string>(quiz, "title")} />
        </div>

        <div className="flex-1">
          <Editor<number>
            type="number"
            label="Default time for question (seconds)"
            {...editorFactory<number>(quiz, "defaultScore")}
          />
          <Editor<number>
            type="number"
            label="Default score for question"
            {...editorFactory<number>(quiz, "defaultTime")}
          />
        </div>
      </div>
      <QuestionsEditor
        defaultQuestion={
          { time: quiz.defaultTime, score: quiz.defaultScore } as Question
        }
        {...editorFactory<Question[]>(quiz, "questions")}
      />
    </main>
  );
};

export default QuizForm;
