import React from 'react';
import { CourseInstructionType } from '../../typings';
import './style.css';
import { Button } from 'uxd-components';

interface IProps {
  t: (key: string) => string;
  chapterList: CourseInstructionType;
  ch1Progress: number;
  progress?: any;
  navigate: (chapterNum, lessonNum) => void;
  isAuth: boolean;
}

const ChapterList: React.SFC<IProps> = (props) => {
  const { t, isAuth, chapterList, progress, ch1Progress, navigate } = props;
  const list = chapterList || [];

  const result = list.map((item, index) => {
    const chapterNum: number = index + 1;
    const chapterKey: string = `chapter${chapterNum}`;

    const progressProfile = progress || {};
    let chapterProgressNum = 0;
    if (chapterNum === 1) {
      chapterProgressNum = ch1Progress;
    }
    if (isAuth) {
      chapterProgressNum = progressProfile[chapterKey] || 0;
    }

    const lessons: string[] = item.lessons || [];
    const totalNum: number = lessons.length;
    const lessonNum = totalNum <= chapterProgressNum ? totalNum : chapterProgressNum + 1;
    let progressText = `(${lessonNum}/${totalNum})`;

    if (!isAuth && chapterNum !== 1) {
      progressText = '';
    }

    return (
      <div key={chapterNum} className="m-2">
        <Button
          level="secondary"
          className="btn-block text-left"
          text={` ${item.title} `}
          onClick={() => navigate(chapterNum, lessonNum)}
          before={<small> {`${t('chapter.chapter')} ${chapterNum} :`}</small>}
          after={<small>{progressText}</small>}
          type="button"
        />
      </div>
    );
  });

  return (
    <div className="chapter-list" data-testid="chapter-list">
      {result}
    </div>
  );
};

export default ChapterList;
