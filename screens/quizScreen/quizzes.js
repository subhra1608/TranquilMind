const quizzes = [
    {
        id: '1',
        title: 'GA7',
        questions: [
          {
            id: '1',
            questionText: 'Feeling nervous, anxious or on edge',
            options: [
              { id:'1', optionText: 'Not at all', score: 0 },
              { id:'2', optionText: 'Several days', score: 1},
              { id:'3', optionText: 'More than half the days', score: 2},
              { id:'4', optionText: 'Nearly every day', score: 3 }
            ],
          },
          {
              id: '2',
              questionText: 'Not being able to stop or control worrying',
              options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
          },
          {
              id: '3',
              questionText: 'Worrying too much about different things',
              options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
          },
          {
              id: '4',
              questionText: 'Trouble Relaxing',
              options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
          },
          {
              id: '5',
              questionText: 'Becoming so restless it is hard to sit still',
              options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
          },
          {
              id: '6',
            questionText: 'Becoming easily annoyed or irritable',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
          },
          {
              id: '7',
            questionText: 'Feeling afraid as if something awful might happen',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
          },
  
        ],
    },
    {
      id: '2',
      title: 'PHQ9',
      questions: [
        {
          id: '1',
          questionText: 'Little interest or pleasure in doing things',
          options: [
            { id:'1', optionText: 'Not at all', score: 0 },
            { id:'2', optionText: 'Several days', score: 1},
            { id:'3', optionText: 'More than half the days', score: 2},
            { id:'4', optionText: 'Nearly every day', score: 3 }
          ],
        },
        {
            id: '2',
            questionText: 'Feeling down, depressed or hopeless',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
        },
        {
            id: '3',
            questionText: 'Trouble falling or staying asleep, or sleeping too much',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
            ],
        },
        {
            id: '4',
            questionText: 'Feeling tired or having little energy',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
        },
        {
            id: '5',
            questionText: 'Poor appetite or over-eating',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
        },
        {
            id: '6',
            questionText: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
        },
        {
            id: '7',
            questionText: 'Trouble concentrating on things, such as reading the newspaper or watching television',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
        },
        {
            id: '8',
            questionText: 'Moving or speaking so slowly that other people could have noticed, or the opposite -  being so fidgety or restless that you have been moving around a lot more than usual',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
        },
        {
            id: '9',
            questionText: 'Thoughts that you would be better off dead or of hurting yourself in some way',
            options: [
                { id:'1', optionText: 'Not at all', score: 0 },
                { id:'2', optionText: 'Several days', score: 1},
                { id:'3', optionText: 'More than half the days', score: 2},
                { id:'4', optionText: 'Nearly every day', score: 3 }
              ],
        }
      ],
    },
    
  ];
  
export default quizzes;