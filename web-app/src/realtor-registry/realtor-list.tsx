import { realtorList } from '@ga/realtor-list-observable-in-realtor-registry';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import { pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';

export const RealtorList = observer(() => {
  const list = pipe(
    realtorList.get(),
    O.fold(
      () => <p>No realtors.</p>,
      (list) => (
        <ul>
          {pipe(
            list,
            RA.map((item) => (
              <li key={item.id}>
                <div>
                  id: {item.id}
                  <br />
                  name: {item.name}
                </div>
              </li>
            ))
          )}
        </ul>
      )
    )
  );

  return (
    <div>
      <h2>Realtor list</h2>

      {list}
    </div>
  );
});
