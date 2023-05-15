import { FC, useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Button from "src/client/component/Button";
import Loading from "src/client/component/Loading";
import { useEditor } from "src/client/hook/useEditor";
import Editor from "src/client/page/master/Editor";
import { proxyClient } from "src/client/util/proxyClient";
import { Question } from "src/server/types/Question";
import { Quiz } from "src/server/types/Quiz";
import Page404 from "../404";
import QuestionsEditor from "./QuestionsEditor";

const QuizForm: FC<{ isNew?: boolean }> = ({ isNew }) => {
  const [status, setStatus] = useState<
    "" | "saved" | "unsaved" | "loading" | "error" | "notfound"
  >(isNew ? "" : "loading");
  const { quizId } = useParams();
  const [quiz, editorFactory, setQuiz] = useEditor<Quiz | null>(new Quiz());
  const navigate = useNavigate();

  useEffect(() => {
    if (quizId) {
      proxyClient.quiz.get
        .query(quizId)
        .then((quiz) => {
          if (!quiz) {
            setStatus("notfound");
            return;
          }
          setQuiz(quiz);
          setStatus("saved");
        })
        .catch(() => setStatus("error"));
    }
  }, [quizId, setQuiz]);

  const save = async () => {
    if (quiz == null) return;
    setStatus("loading");
    const reconstructed = new Quiz(quiz);
    console.log("save", reconstructed);
    const quizId = isNew
      ? await proxyClient.quiz.create.query(reconstructed)
      : await proxyClient.quiz.update.query(reconstructed);

    if (!quizId) {
      setStatus("error");
      return;
    }
    setStatus("saved");
    if (isNew) {
      navigate(`/edit/${quizId}`, { replace: true });
    }
  };

  if (status === "notfound") return <Page404 />;

  if (status === "loading" || quiz == null) return <Loading />;

  return (
    <main className="bg-white absolute inset-0 flex flex-col gap-4 p-4 overflow-y-scroll">
      <div className="flex items-center gap-4">
        <div className="grow font-bold text-3xl text-left w-full">
          Quiz editor
        </div>
        <div className="italic">{status !== "unsaved" && status}</div>
        <Button onClick={save}>
          <FaSave />
          Save
        </Button>
      </div>
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
