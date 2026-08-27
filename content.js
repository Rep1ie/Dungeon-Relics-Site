/* content.js — ЕДИНЫЙ ИСТОЧНИК КОНТЕНТА (сгенерировано конструктором).
   id — СТАБИЛЬНЫЙ идентификатор. Иконка = assets/icons/<тип>/<id>.png. */
window.DR_CONTENT = {
  "formulaNote": {
    "en": "I — a multiplier equal to the number of abilities selected in a branch. W — the damage of the current weapon.",
    "ru": "I — множитель, равный числу навыков, выбранных в ветке. W — урон текущего оружия."
  },
  "classes": [
    {
      "id": "warrior",
      "key": "warrior",
      "icon": "🛡️",
      "name": {
        "en": "Warrior",
        "ru": "Воин"
      },
      "role": {
        "en": "Tank",
        "ru": "Танк"
      },
      "desc": {
        "en": "Excels at drawing and holding enemy aggression, mitigating damage, and controlling crowds. High survivability through heavy armor, health regeneration, and damage reflection. Vulnerable while casting powerful attacks.",
        "ru": "Мастер удержания агро и контроля толпы. Высокая живучесть за счёт тяжёлой брони, регенерации и отражения урона. Уязвим во время мощных кастов."
      },
      "actives": [
        {
          "id": "warrior--rage-roar",
          "n": {
            "en": "Rage Roar",
            "ru": "Рёв ярости"
          },
          "d": {
            "en": "Forces all enemies within 5 + 1×I meters to attack you for 8s.",
            "ru": "Заставляет всех врагов в радиусе 5+1×I м атаковать вас 8 сек."
          },
          "cd": "30",
          "mp": "30"
        },
        {
          "id": "warrior--iron-wall",
          "n": {
            "en": "Iron Wall",
            "ru": "Железная стена"
          },
          "d": {
            "en": "40 + 6×I% chance to block all damage for 3 seconds. On success, stuns the attacker for 1 second.",
            "ru": "40+6×I% шанс заблокировать весь урон на 3 сек. При успехе оглушает атакующего на 1 сек."
          },
          "cd": "15",
          "mp": "20"
        },
        {
          "id": "warrior--crushing-blow",
          "n": {
            "en": "Crushing Blow",
            "ru": "Сокрушающий удар"
          },
          "d": {
            "en": "A powerful strike within 3 m, dealing W + 20 + 8×I damage and knocking the enemy back. You take +30% damage for 3s.",
            "ru": "Удар в радиусе 3м: W+20+8×I урона и отбрасывание. Вы получаете +30% урона 3 сек."
          },
          "cd": "12",
          "mp": "20"
        },
        {
          "id": "warrior--titan",
          "n": {
            "en": "Titan",
            "ru": "Титан"
          },
          "d": {
            "en": "Increases max HP by 15 + 5×I% for 8 sec.",
            "ru": "+15+5×I% к макс. HP на 8 сек."
          },
          "cd": "75",
          "mp": "30",
          "b": {
            "en": "Passive: +4 HP/second outside combat.",
            "ru": "Пассивно: +4 HP/сек вне боя."
          }
        }
      ],
      "passives": [
        {
          "id": "warrior--blood-debt",
          "n": {
            "en": "Blood Debt",
            "ru": "Долг крови"
          },
          "d": {
            "en": "Returns 10% of damage taken to enemies within 10 meters.",
            "ru": "Возвращает 10% полученного урона врагам в радиусе 10м."
          }
        },
        {
          "id": "warrior--defenders-fury",
          "n": {
            "en": "Defender's Fury",
            "ru": "Ярость защитника"
          },
          "d": {
            "en": "Each critical hit against you increases the damage of your next attack by 15% (max 3 stacks).",
            "ru": "Каждый крит по вам повышает урон след. атаки на 15% (до 3 зарядов)."
          }
        },
        {
          "id": "warrior--unyielding",
          "n": {
            "en": "Unyielding",
            "ru": "Несгибаемый"
          },
          "d": {
            "en": "Grants immunity to stun, root and slow effects.",
            "ru": "Иммунитет к оглушению, обездвиживанию и замедлению."
          }
        },
        {
          "id": "warrior--shieldbearer",
          "n": {
            "en": "Shieldbearer",
            "ru": "Щитоносец"
          },
          "d": {
            "en": "Increases armor value by 50%.",
            "ru": "+50% к значению брони."
          }
        }
      ]
    },
    {
      "id": "priest",
      "key": "priest",
      "icon": "✨",
      "name": {
        "en": "Priest",
        "ru": "Жрец"
      },
      "role": {
        "en": "Support",
        "ru": "Поддержка"
      },
      "desc": {
        "en": "The primary healer and protector of the group. Can remove negative status effects, resurrect fallen allies, and apply damage-absorbing shields. Poorly defended when alone.",
        "ru": "Главный целитель и защитник группы. Снимает негативные эффекты, воскрешает павших и накладывает поглощающие щиты. Плохо защищён в одиночку."
      },
      "actives": [
        {
          "id": "priest--flash-heal",
          "n": {
            "en": "Flash Heal",
            "ru": "Быстрое исцеление"
          },
          "d": {
            "en": "Instantly restores 40 + 12×I HP to an ally.",
            "ru": "Мгновенно восстанавливает союзнику 40+12×I HP."
          },
          "cd": "10",
          "mp": "30"
        },
        {
          "id": "priest--purifying-light",
          "n": {
            "en": "Purifying Light",
            "ru": "Очищающий свет"
          },
          "d": {
            "en": "Removes all debuffs from the group within 8m.",
            "ru": "Снимает все дебаффы с группы в радиусе 8м."
          },
          "cd": "40",
          "mp": "75",
          "b": {
            "en": "Maxed: immunity to debuffs for 5 sec.",
            "ru": "Макс: иммунитет к дебаффам 5 сек."
          }
        },
        {
          "id": "priest--holy-barrier",
          "n": {
            "en": "Holy Barrier",
            "ru": "Священный барьер"
          },
          "d": {
            "en": "Shields target for 6s, absorbing 100 damage.",
            "ru": "Щит на 6 сек, поглощает 100 урона."
          },
          "cd": "10",
          "mp": "50"
        },
        {
          "id": "priest--resurrection",
          "n": {
            "en": "Resurrection",
            "ru": "Воскрешение"
          },
          "d": {
            "en": "Revives an ally with 25 + 5×I% HP.",
            "ru": "Оживляет союзника с 25+5×I% HP."
          },
          "cd": "180",
          "mp": "50",
          "b": {
            "en": "Maxed: grants 3s invulnerability.",
            "ru": "Макс: 3 сек неуязвимости."
          }
        }
      ],
      "passives": [
        {
          "id": "priest--chain-of-care",
          "n": {
            "en": "Chain of Care",
            "ru": "Цепь заботы"
          },
          "d": {
            "en": "After the first Flash Heal, healing a new ally increases HP restored by 15% per stack (up to 3). Healing the same ally twice in a row resets stacks.",
            "ru": "После первого исцеления лечение нового союзника +15% за заряд (до 3). Лечение одного дважды подряд сбрасывает заряды."
          }
        },
        {
          "id": "priest--aura-of-life",
          "n": {
            "en": "Aura of Life",
            "ru": "Аура жизни"
          },
          "d": {
            "en": "Allies within 8 meters gain +1 HP/sec regen outside combat.",
            "ru": "Союзники в 8м получают +1 HP/сек вне боя."
          }
        },
        {
          "id": "priest--grace-of-light",
          "n": {
            "en": "Grace of Light",
            "ru": "Благодать света"
          },
          "d": {
            "en": "Your light remains connected to living allies, revealing their health, mana, and skill cooldowns regardless of distance or obstacles.",
            "ru": "Ваш свет связан с живыми союзниками — видите их HP, ману и КД независимо от расстояния и преград."
          }
        },
        {
          "id": "priest--last-chance",
          "n": {
            "en": "Last Chance",
            "ru": "Последний шанс"
          },
          "d": {
            "en": "When an ally dies, you become immune to all damage for 10s. Cooldown: once per dungeon.",
            "ru": "Когда союзник умирает, вы получаете иммунитет ко всему урону на 10 сек. КД: раз за подземелье."
          }
        }
      ]
    },
    {
      "id": "mage",
      "key": "mage",
      "icon": "🔮",
      "name": {
        "en": "Mage",
        "ru": "Маг"
      },
      "role": {
        "en": "Control / Damage",
        "ru": "Контроль / Урон"
      },
      "desc": {
        "en": "Masters battlefield manipulation by controlling enemy positioning and movement with walls and teleportation. Deals damage through effects (fire, ice) and skill combinations. Mana-efficient.",
        "ru": "Мастер манипуляции полем боя: контролирует позиции и передвижение врагов стенами и телепортами. Наносит урон стихиями и комбо. Экономит ману."
      },
      "actives": [
        {
          "id": "mage--ice-wall",
          "n": {
            "en": "Ice Wall",
            "ru": "Ледяная стена"
          },
          "d": {
            "en": "Summons a wall blocking enemies for 12s.",
            "ru": "Призывает стену, блокирующую врагов на 12 сек."
          },
          "cd": "40−2×I",
          "mp": "50",
          "b": {
            "en": "Passive: shards slow enemies by 20 + 8×I% when shattered.",
            "ru": "Пассив: осколки замедляют врагов на 20+8×I%."
          }
        },
        {
          "id": "mage--spatial-jump",
          "n": {
            "en": "Spatial Jump",
            "ru": "Пространственный скачок"
          },
          "d": {
            "en": "Teleports up to 12 meters.",
            "ru": "Телепорт до 12 метров."
          },
          "cd": "20",
          "mp": "30"
        },
        {
          "id": "mage--frost-prison",
          "n": {
            "en": "Frost Prison",
            "ru": "Морозная тюрьма"
          },
          "d": {
            "en": "Freezes an enemy for 3 + 0.4×I s, dealing 50 + 5×I damage.",
            "ru": "Замораживает врага на 3+0.4×I сек, наносит 50+5×I урона."
          },
          "cd": "12",
          "mp": "50",
          "b": {
            "en": "Passive: if killed while frozen, explodes for 75 damage.",
            "ru": "Пассив: если убит замороженным — взрыв на 75 урона."
          }
        },
        {
          "id": "mage--fire-burst",
          "n": {
            "en": "Fire Burst",
            "ru": "Огненный залп"
          },
          "d": {
            "en": "Shoots a flame in a line, dealing 90 + 6×I damage and igniting the target (5 DPS for 10s).",
            "ru": "Луч пламени по линии: 90+6×I урона + поджог (5/сек 10 сек)."
          },
          "cd": "50",
          "mp": "60"
        }
      ],
      "passives": [
        {
          "id": "mage--time-distortion",
          "n": {
            "en": "Time Distortion",
            "ru": "Искажение времени"
          },
          "d": {
            "en": "Each active skill has a 10% chance to instantly recharge.",
            "ru": "10% шанс мгновенно перезарядить любой активный навык."
          }
        },
        {
          "id": "mage--mana-efficiency",
          "n": {
            "en": "Mana Efficiency",
            "ru": "Экономия маны"
          },
          "d": {
            "en": "All sources of mana loss are reduced by 40%.",
            "ru": "Все затраты маны снижены на 40%."
          }
        },
        {
          "id": "mage--astral-afterimage",
          "n": {
            "en": "Astral Afterimage",
            "ru": "Астральный отпечаток"
          },
          "d": {
            "en": "Teleporting creates an illusion, taunting enemies for 8s. Explodes for 50 + 10×I damage on vanishing.",
            "ru": "Телепорт создаёт иллюзию, провоцирующую врагов 8 сек. При исчезновении взрыв на 50+10×I."
          }
        },
        {
          "id": "mage--coolness",
          "n": {
            "en": "Coolness",
            "ru": "Хладнокровие"
          },
          "d": {
            "en": "Increases duration of control effects (freeze, slow) by 50%.",
            "ru": "+50% к длительности эффектов контроля (заморозка, замедление)."
          }
        }
      ]
    },
    {
      "id": "ranger",
      "key": "ranger",
      "icon": "🏹",
      "name": {
        "en": "Ranger",
        "ru": "Следопыт"
      },
      "role": {
        "en": "Scout / Sniper",
        "ru": "Разведчик / Снайпер"
      },
      "desc": {
        "en": "Specializes in scouting territory, disarming traps, and eliminating high-priority targets with precision shots. Significantly boosts party efficiency by spotting hidden dangers, marking targets, and accelerating resource gathering.",
        "ru": "Специализируется на разведке, обезвреживании ловушек и устранении приоритетных целей точными выстрелами. Значительно повышает эффективность группы."
      },
      "actives": [
        {
          "id": "ranger--decoy",
          "n": {
            "en": "Decoy",
            "ru": "Отвлечение"
          },
          "d": {
            "en": "Throws a stone to make noise at a target spot.",
            "ru": "Бросает камень, создавая шум в точке."
          },
          "cd": "10",
          "mp": "10"
        },
        {
          "id": "ranger--deadly-shot",
          "n": {
            "en": "Deadly Shot",
            "ru": "Смертельный выстрел"
          },
          "d": {
            "en": "Headshot attack, dealing W + 100 + 10×I damage. 3s aim time.",
            "ru": "Выстрел в голову: W+100+10×I урона. 3 сек прицеливания."
          },
          "cd": "20",
          "mp": "30"
        },
        {
          "id": "ranger--trap-analysis",
          "n": {
            "en": "Trap Analysis",
            "ru": "Анализ ловушек"
          },
          "d": {
            "en": "Reveals all traps/treasures within a 20m radius for 5s.",
            "ru": "Выявляет все ловушки/сокровища в радиусе 20м на 5 сек."
          },
          "cd": "30",
          "mp": "30"
        },
        {
          "id": "ranger--hunters-mark",
          "n": {
            "en": "Hunter's Mark",
            "ru": "Метка охотника"
          },
          "d": {
            "en": "Marks a target for 12s; all damage it takes +25%.",
            "ru": "Метит цель на 12 сек: +25% ко всему получаемому ею урону."
          },
          "cd": "60",
          "mp": "30"
        }
      ],
      "passives": [
        {
          "id": "ranger--quick-hands",
          "n": {
            "en": "Quick Hands",
            "ru": "Ловкие руки"
          },
          "d": {
            "en": "Reduces loot collection and trap/object interaction time by 50%.",
            "ru": "−50% времени сбора лута и взаимодействия с ловушками/объектами."
          }
        },
        {
          "id": "ranger--cartographer",
          "n": {
            "en": "Cartographer",
            "ru": "Картограф"
          },
          "d": {
            "en": "Automatically marks and memorizes traveled areas on the map.",
            "ru": "Автоматически отмечает и запоминает пройденные области на карте."
          }
        },
        {
          "id": "ranger--pinpoint-strike",
          "n": {
            "en": "Pinpoint Strike",
            "ru": "Точный удар"
          },
          "d": {
            "en": "Crit chance +25%. Crits deal +50% damage.",
            "ru": "+25% шанс крита; криты наносят +50% урона."
          }
        },
        {
          "id": "ranger--gatherer",
          "n": {
            "en": "Gatherer",
            "ru": "Собиратель"
          },
          "d": {
            "en": "Doubles inventory capacity.",
            "ru": "Удваивает вместимость инвентаря."
          }
        }
      ]
    },
    {
      "id": "barbarian",
      "key": "barbarian",
      "icon": "🪓",
      "name": {
        "en": "Barbarian",
        "ru": "Варвар"
      },
      "role": {
        "en": "Melee Damage",
        "ru": "Ближний урон"
      },
      "desc": {
        "en": "Deals massive damage at the cost of his own health. His abilities either unleash wide-area attacks or significantly empower his strikes. Becomes exceptionally potent in critical situations when his health is low.",
        "ru": "Наносит огромный урон ценой собственного здоровья. Широкие атаки по площади и усиление ударов. Становится особенно силён на низком HP."
      },
      "actives": [
        {
          "id": "barbarian--bloody-inspiration",
          "n": {
            "en": "Bloody Inspiration",
            "ru": "Кровавое воодушевление"
          },
          "d": {
            "en": "Lose 15% HP to increase self and ally attack speed by 25% for 8s.",
            "ru": "Теряет 15% HP: +25% скорости атаки себе и союзникам на 8 сек."
          },
          "cd": "40",
          "mp": "20",
          "b": {
            "en": "Passive: +10% damage resistance during the effect.",
            "ru": "Пассив: +10% сопротивления урону во время эффекта."
          }
        },
        {
          "id": "barbarian--death-charge",
          "n": {
            "en": "Death Charge",
            "ru": "Смертельный рывок"
          },
          "d": {
            "en": "Charge dealing 120 damage, stunning for 2s, lose 15% HP.",
            "ru": "Рывок: 120 урона, оглушение 2 сек, −15% HP."
          },
          "cd": "15",
          "mp": "10",
          "b": {
            "en": "Maxed: leaves a bloody trail that slows enemies.",
            "ru": "Макс: кровавый след замедляет врагов."
          }
        },
        {
          "id": "barbarian--whirlwind-of-despair",
          "n": {
            "en": "Whirlwind of Despair",
            "ru": "Вихрь отчаяния"
          },
          "d": {
            "en": "Spin with your sword, dealing W + 8×I DPS to all nearby. Lose 5% HP/sec. Duration: 5s.",
            "ru": "Вращение с мечом: W+8×I урона/сек всем рядом. −15% HP/сек. Длит. 5 сек."
          },
          "cd": "15",
          "mp": "15"
        },
        {
          "id": "barbarian--price-of-blood",
          "n": {
            "en": "Price of Blood",
            "ru": "Цена крови"
          },
          "d": {
            "en": "Lose 30% HP to increase damage by 65 + 7×I% for 6s.",
            "ru": "Теряет 30% HP: +65+7×I% урона на 6 сек."
          },
          "cd": "75",
          "mp": "10",
          "b": {
            "en": "Maxed: +25% damage at HP < 30%.",
            "ru": "Макс: +25% урона при HP < 30%."
          }
        }
      ],
      "passives": [
        {
          "id": "barbarian--bloodthirst",
          "n": {
            "en": "Bloodthirst",
            "ru": "Жажда крови"
          },
          "d": {
            "en": "Killing an enemy restores 10% HP. Cooldown: 10 sec.",
            "ru": "Убийство врага восстанавливает 10% HP. КД 10 с."
          }
        },
        {
          "id": "barbarian--bloody-vengeance",
          "n": {
            "en": "Bloody Vengeance",
            "ru": "Кровавая месть"
          },
          "d": {
            "en": "On death, explode for 250 damage to nearby enemies.",
            "ru": "При смерти взрыв на 250 урона по врагам рядом."
          }
        },
        {
          "id": "barbarian--last-stand",
          "n": {
            "en": "Last Stand",
            "ru": "Последний рубеж"
          },
          "d": {
            "en": "A lethal hit leaves you at 1 HP instead of killing you, then you become immortal for 3 seconds. Cooldown: once per dungeon.",
            "ru": "Смертельный удар оставляет вас на 1 HP вместо смерти, затем 3 сек бессмертия. КД: раз за подземелье."
          }
        },
        {
          "id": "barbarian--adrenaline",
          "n": {
            "en": "Adrenaline",
            "ru": "Адреналин"
          },
          "d": {
            "en": "At HP < 30%, attack speed +50%.",
            "ru": "При HP < 30% скорость атаки +50%."
          }
        }
      ]
    },
    {
      "id": "assassin",
      "key": "assassin",
      "icon": "🗡️",
      "name": {
        "en": "Assassin",
        "ru": "Ассасин"
      },
      "role": {
        "en": "Saboteur",
        "ru": "Диверсант"
      },
      "desc": {
        "en": "A master of stealth and precision kills. Excels at immobilizing and disabling key targets, ignoring their armor and defenses. Invaluable for bypassing unnecessary fights and creating advantageous engagements for the party.",
        "ru": "Мастер скрытности и точных убийств. Обездвиживает и выводит из строя ключевые цели, игнорируя их броню. Незаменим для обхода лишних боёв."
      },
      "actives": [
        {
          "id": "assassin--silent-step",
          "n": {
            "en": "Silent Step",
            "ru": "Бесшумный шаг"
          },
          "d": {
            "en": "Full invisibility for 10s. Taking or dealing damage breaks it.",
            "ru": "Полная невидимость 10 сек. Получение/нанесение урона снимает её."
          },
          "cd": "30",
          "mp": "20",
          "b": {
            "en": "Passive: +15% movement speed while active.",
            "ru": "Пассив: +15% скорости передвижения."
          }
        },
        {
          "id": "assassin--eviscerate",
          "n": {
            "en": "Eviscerate",
            "ru": "Потрошение"
          },
          "d": {
            "en": "Backstab from behind, dealing W×I pure damage and stunning for 5s. Otherwise deals normal attack damage.",
            "ru": "Удар в спину: W×I чистого урона + оглушение 5 сек. Иначе — обычный урон."
          },
          "cd": "15",
          "mp": "20"
        },
        {
          "id": "assassin--weapon-throw",
          "n": {
            "en": "Weapon Throw",
            "ru": "Метание оружия"
          },
          "d": {
            "en": "Instantly throws a weapon for W + 50 + 6×I damage, causing bleed (5 DPS/10s).",
            "ru": "Мгновенно бросает оружие: W+50+6×I урона + кровотечение (5/сек 10 сек)."
          },
          "cd": "25",
          "mp": "20"
        },
        {
          "id": "assassin--dark-sphere",
          "n": {
            "en": "Dark Sphere",
            "ru": "Сфера тьмы"
          },
          "d": {
            "en": "Extinguishes lights within 25m, creating a sphere that makes the group invisible in darkness for 12s.",
            "ru": "Гасит свет в 25м, создаёт сферу, делающую группу невидимой в темноте на 12 сек."
          },
          "cd": "120",
          "mp": "30"
        }
      ],
      "passives": [
        {
          "id": "assassin--aura-of-silence",
          "n": {
            "en": "Aura of Silence",
            "ru": "Аура тишины"
          },
          "d": {
            "en": "Reduces group aggro radius by 4m.",
            "ru": "−4м к радиусу агро группы."
          }
        },
        {
          "id": "assassin--elusive-silhouette",
          "n": {
            "en": "Elusive Silhouette",
            "ru": "Ускользающий силуэт"
          },
          "d": {
            "en": "50% chance enemies will miss you for 3s after exiting invisibility.",
            "ru": "50% шанс промаха врагов по вам 3 сек после выхода из невидимости."
          }
        },
        {
          "id": "assassin--spectral-strike",
          "n": {
            "en": "Spectral Strike",
            "ru": "Призрачный удар"
          },
          "d": {
            "en": "Attacks from invisibility have a 20% chance to instantly refresh Silent Step's cooldown.",
            "ru": "Атаки из невидимости имеют 20% шанс мгновенно сбросить КД «Бесшумного шага»."
          }
        },
        {
          "id": "assassin--poisoned-blades",
          "n": {
            "en": "Poisoned Blades",
            "ru": "Отравленные клинки"
          },
          "d": {
            "en": "Basic attacks apply Poison: 5 DPS for 2s. This effect stacks.",
            "ru": "Обычные атаки накладывают яд: 5/сек 2 сек. Эффект складывается."
          }
        }
      ]
    }
  ],
  "monsters": [
    {
      "id": "slime",
      "icon": "🟢",
      "threat": "mid",
      "hp": "500",
      "dmg": "60",
      "name": {
        "en": "Slime",
        "ru": "Слизь"
      },
      "lore": {
        "en": "An ancient swamp-born abomination with neither bones nor fear. It does not hunt — it simply spreads, devouring stone, flesh, and steel until all around it becomes part of its poisonous, quivering mass.",
        "ru": "Древняя болотная мерзость без костей и страха. Она не охотится — она просто расползается, пожирая камень, плоть и сталь, пока всё вокруг не станет частью её ядовитой дрожащей массы."
      },
      "abilities": [
        {
          "n": {
            "en": "Splitting Ooze",
            "ru": "Расщепляющаяся слизь"
          },
          "d": {
            "en": "When the Slime dies, its body ruptures and divides into two smaller Slimes.",
            "ru": "При гибели тело разрывается и делится на двух меньших Слизняков."
          }
        },
        {
          "n": {
            "en": "Venomous Innards",
            "ru": "Ядовитые внутренности"
          },
          "d": {
            "en": "Leaves behind poison pools that slow movement, reduce armor, and deal 10 damage per second.",
            "ru": "Оставляет ядовитые лужи: замедление, −броня, 10 урона/сек."
          }
        },
        {
          "n": {
            "en": "Boggrip",
            "ru": "Хватка топи"
          },
          "d": {
            "en": "If a player stands in a poison pool for more than 3 seconds, the sludge roots them for 2 seconds.",
            "ru": "Если игрок стоит в луже дольше 3 сек, жижа обвивает ноги и обездвиживает на 2 сек."
          }
        },
        {
          "n": {
            "en": "Swampborn Flesh",
            "ru": "Болотная плоть"
          },
          "d": {
            "en": "The Slime is immune to poison.",
            "ru": "Иммунна к яду."
          }
        }
      ],
      "counter": {
        "en": "Do not let the Slime dictate the battlefield. Reposition early and avoid fighting inside corrupted ground. Fire and frost magic can neutralize its toxic residue.",
        "ru": "Не позволяйте Слизи диктовать поле боя. Меняйте позицию заранее и не сражайтесь на заражённой земле. Огонь и лёд нейтрализуют её токсичный след."
      }
    },
    {
      "id": "little-slime",
      "icon": "🟢",
      "threat": "low",
      "hp": "250",
      "dmg": "20",
      "name": {
        "en": "Little Slime",
        "ru": "Слизняк"
      },
      "lore": {
        "en": "A lesser spawn born from the corpse of a fallen Slime. Alone, they seem manageable — but wherever one crawls, the ground itself turns hostile to the living.",
        "ru": "Мелкий отпрыск, рождённый из трупа павшей Слизи. Поодиночке кажутся безобидными — но где проползёт хоть один, земля становится враждебной живому."
      },
      "abilities": [
        {
          "n": {
            "en": "Toxic Trail",
            "ru": "Токсичный след"
          },
          "d": {
            "en": "Leaves behind poison pools (slow, −armor, 10 damage per second).",
            "ru": "Оставляет ядовитые лужи (замедление, −броня, 10 урона/сек)."
          }
        },
        {
          "n": {
            "en": "Boggrip",
            "ru": "Хватка топи"
          },
          "d": {
            "en": "A pool roots players for 2 seconds after 3 seconds of standing.",
            "ru": "Лужа обездвиживает на 2 сек после 3 сек стояния."
          }
        },
        {
          "n": {
            "en": "Corrupted Flesh",
            "ru": "Заражённая плоть"
          },
          "d": {
            "en": "Immune to poison.",
            "ru": "Иммунен к яду."
          }
        }
      ],
      "counter": {
        "en": "Do not underestimate the lesser spawn. Their danger lies not in their bite, but in how quickly they turn safe ground into a death trap. Cleanse their trail with magic and don't get surrounded.",
        "ru": "Опасность не в укусе, а в том, как быстро они превращают безопасную землю в ловушку. Выжигайте след магией и не дайте себя окружить."
      }
    },
    {
      "id": "zombie",
      "icon": "🧟",
      "threat": "mid",
      "hp": "700",
      "dmg": "90",
      "name": {
        "en": "Zombie",
        "ru": "Зомби"
      },
      "lore": {
        "en": "Not mere shambling corpses, but plague-ridden vessels still animated by a hateful will. They hear suffering like a tolling funeral bell — and answer it.",
        "ru": "Не просто бредущие трупы, а чумные сосуды, движимые ненавистью. Они слышат страдание, как погребальный колокол — и отвечают на него."
      },
      "abilities": [
        {
          "n": {
            "en": "Deathwail",
            "ru": "Смертный вопль"
          },
          "d": {
            "en": "Upon taking its first hit, the Zombie lets out a scream, calling all other Zombies within 30 meters.",
            "ru": "Получив первый удар, зомби издаёт вопль, созывая всех зомби в радиусе 30м."
          }
        },
        {
          "n": {
            "en": "Rotting Wound",
            "ru": "Гниющая рана"
          },
          "d": {
            "en": "Attacks inflict Rot, dealing 10 damage per second for 3 seconds.",
            "ru": "Атаки накладывают Гниль — 10 урона/сек 3 сек."
          }
        },
        {
          "n": {
            "en": "Plague Rebirth",
            "ru": "Чумное перерождение"
          },
          "d": {
            "en": "If a player dies while afflicted by Rot, they rise again as a Zombie.",
            "ru": "Если игрок умирает под Гнилью, он восстаёт зомби."
          }
        }
      ],
      "counter": {
        "en": "Zombies are most dangerous in prolonged, noisy fights. Their strength is momentum, not finesse. Sacred power is their bane: a Priest's healing magic scorches them.",
        "ru": "Зомби опаснее всего в затяжном шумном бою. Их сила — в напоре. Священная магия — их погибель: лечение Жреца выжигает их."
      }
    },
    {
      "id": "goblin",
      "icon": "👺",
      "threat": "low",
      "hp": "400",
      "dmg": "40",
      "name": {
        "en": "Goblin",
        "ru": "Гоблин"
      },
      "lore": {
        "en": "A wiry, cowardly scavenger of the underways. It does not merely take what is loose — it takes what you need most, then vanishes into the cracks of the earth, cackling in the dark.",
        "ru": "Жилистый трусливый падальщик подземных ходов. Он крадёт не то, что плохо лежит, — он крадёт то, что нужнее всего, и исчезает в трещинах земли, хохоча во тьме."
      },
      "abilities": [
        {
          "n": {
            "en": "Quick Fingers",
            "ru": "Быстрые пальцы"
          },
          "d": {
            "en": "Steals items from a player's back and flees toward its den.",
            "ru": "Крадёт предмет со спины игрока и бежит в логово."
          }
        },
        {
          "n": {
            "en": "Rustspike Trick",
            "ru": "Ржавый трюк"
          },
          "d": {
            "en": "While escaping, scatters rusted caltrops. Those who step on them suffer a brief micro-stun and Bleeding (5 damage per second).",
            "ru": "Убегая, разбрасывает ржавые шипы. Наступивший получает микро-оглушение и кровотечение (5/сек)."
          }
        },
        {
          "n": {
            "en": "Coward's Reflex",
            "ru": "Рефлекс труса"
          },
          "d": {
            "en": "If hit or stunned during the theft, it drops the stolen item and flees in panic.",
            "ru": "Если ранен или оглушён во время кражи — роняет предмет и в панике убегает."
          }
        }
      ],
      "counter": {
        "en": "Do not chase blindly — that is exactly what it wants. Sometimes it is wiser to stop the theft than to sprint after it. But if you reach the den, the reward may outweigh the loss.",
        "ru": "Не гонитесь вслепую — именно этого он и хочет. Иногда мудрее прервать кражу, чем мчаться за ним. Но если добраться до логова — награда может окупить потерю."
      }
    },
    {
      "id": "mimic",
      "icon": "🧰",
      "threat": "mid",
      "hp": "400",
      "dmg": "40",
      "name": {
        "en": "Mimic",
        "ru": "Мимик"
      },
      "lore": {
        "en": "A predator that learned to wear the shape of greed itself. It does not chase prey — it waits for prey to reach for it willingly.",
        "ru": "Хищник, научившийся носить облик самой жадности. Он не преследует добычу — он ждёт, пока она сама к нему потянется."
      },
      "abilities": [
        {
          "n": {
            "en": "False Treasure",
            "ru": "Ложное сокровище"
          },
          "d": {
            "en": "Disguises itself as a treasure chest, nearly indistinguishable from the real thing.",
            "ru": "Маскируется под сундук, почти неотличимый от настоящего."
          }
        },
        {
          "n": {
            "en": "Devouring Maw",
            "ru": "Пожирающая пасть"
          },
          "d": {
            "en": "When a player interacts with it, the Mimic snaps shut around them, dealing 40 damage per second for 10 seconds.",
            "ru": "При взаимодействии захлопывается вокруг игрока, нанося 40 урона/сек 10 сек."
          }
        }
      ],
      "counter": {
        "en": "Greed kills faster than venom. Test suspicious chests with damage or a Ranger's scouting. If an ally is caught, the whole party must immediately focus the Mimic.",
        "ru": "Жадность убивает быстрее яда. Подозрительные сундуки проверяйте уроном или разведкой Следопыта. Если союзник схвачен — вся группа фокусит Мимика."
      }
    },
    {
      "id": "lure-weaver",
      "icon": "🕷️",
      "threat": "high",
      "hp": "600",
      "dmg": "50",
      "name": {
        "en": "Lure-weaver",
        "ru": "Ткач-удильщик"
      },
      "lore": {
        "en": "A cave-dwelling spider that cultivated a deceitful beacon upon its own back. Its crystal does not shine like fire — it shines like salvation in the dark. Those who trust that light rarely survive it.",
        "ru": "Пещерный паук, взрастивший на собственной спине лживый маяк. Его кристалл сияет не как огонь — как спасение во тьме. Те, кто доверяет этому свету, редко его переживают."
      },
      "extra": {
        "en": "Crystal Health: 100",
        "ru": "Кристалл: 100"
      },
      "abilities": [
        {
          "n": {
            "en": "Beacon of False Salvation",
            "ru": "Маяк ложного спасения"
          },
          "d": {
            "en": "A glowing crystal grows from its back. Any player who looks at it becomes Charmed and walks helplessly toward the spider.",
            "ru": "На спине растёт светящийся кристалл. Взглянувший становится Очарованным и беспомощно идёт к пауку."
          }
        },
        {
          "n": {
            "en": "Dropfang Ambush",
            "ru": "Засада-падение"
          },
          "d": {
            "en": "Once the charmed victim comes close enough, the creature leaps down and bites.",
            "ru": "Когда очарованная жертва приближается, тварь спрыгивает и кусает."
          }
        },
        {
          "n": {
            "en": "Venom of Confusion",
            "ru": "Яд смятения"
          },
          "d": {
            "en": "Its bite inflicts Confusion, dimming the screen, warping sound, and disorienting the victim for several seconds.",
            "ru": "Укус вызывает Смятение: затемняет экран, искажает звук, дезориентирует."
          }
        }
      ],
      "counter": {
        "en": "Discipline your gaze. Do not let the crystal lead you. If an ally is charmed, attack the crystal rather than the beast — shattering the lure breaks the spell.",
        "ru": "Дисциплинируйте взгляд. Не дайте кристаллу вести вас. Если союзник очарован — бейте кристалл, а не зверя: разбитая приманка снимает чары."
      }
    },
    {
      "id": "ethereal-wrath",
      "icon": "👻",
      "threat": "mid",
      "hp": "200",
      "dmg": "0",
      "name": {
        "en": "Ethereal Wrath",
        "ru": "Эфирный призрак"
      },
      "lore": {
        "en": "A bodiless hunger drifting between stone and air. It does not crave blood — it feeds on willpower, mana, and a victim's very sense of control over their own body.",
        "ru": "Бестелесный голод, дрейфующий меж камнем и воздухом. Он жаждет не крови — он питается волей, маной и самим ощущением контроля жертвы над своим телом."
      },
      "abilities": [
        {
          "n": {
            "en": "Aether Hunger",
            "ru": "Голод эфира"
          },
          "d": {
            "en": "Seeks out the player with the highest amount of mana, possesses them, and drains 10 mana per second.",
            "ru": "Ищет игрока с наибольшим запасом маны, вселяется и вытягивает 10 маны/сек."
          }
        },
        {
          "n": {
            "en": "Twisted Will",
            "ru": "Искажённая воля"
          },
          "d": {
            "en": "While possessed, the victim's movement controls are inverted.",
            "ru": "Пока одержим, управление движением жертвы инвертируется."
          }
        },
        {
          "n": {
            "en": "Veilstep",
            "ru": "Шаг сквозь завесу"
          },
          "d": {
            "en": "Can move through walls and obstacles.",
            "ru": "Может двигаться сквозь стены и препятствия."
          }
        },
        {
          "n": {
            "en": "Formless Being",
            "ru": "Бесформенное существо"
          },
          "d": {
            "en": "Immune to physical damage.",
            "ru": "Иммунен к физическому урону."
          }
        },
        {
          "n": {
            "en": "Child of Darkness",
            "ru": "Дитя тьмы"
          },
          "d": {
            "en": "In darkness, it is nearly invisible.",
            "ru": "В темноте почти невидим."
          }
        }
      ],
      "counter": {
        "en": "Blades are useless — only magic, light, and a Priest's healing spells can harm it. It turns the party's strongest caster into a liability: here, power is also bait.",
        "ru": "Клинки бесполезны — только магия, свет и лечащие заклинания Жреца ранят его. Он превращает сильнейшего кастера в обузу: здесь сила — это тоже приманка."
      }
    },
    {
      "id": "shadow-stalker",
      "icon": "🌑",
      "threat": "mid",
      "hp": "350",
      "dmg": "30",
      "name": {
        "en": "Shadow Stalker",
        "ru": "Теневой ловчий"
      },
      "lore": {
        "en": "A hunter that does not merely dwell in darkness — it creates it. It comes not for the weak, but for those who dare believe they have brought enough light.",
        "ru": "Охотник, что не просто обитает во тьме — он творит её. Он приходит не за слабыми, а за теми, кто смеет верить, что принёс достаточно света."
      },
      "abilities": [
        {
          "n": {
            "en": "Snuff Out",
            "ru": "Погашение"
          },
          "d": {
            "en": "Periodically extinguishes torches and can place Silence on players' magical light sources.",
            "ru": "Периодически гасит факелы и может наложить Тишину на магические источники света игроков."
          }
        },
        {
          "n": {
            "en": "Clutch of the Dark",
            "ru": "Хватка тьмы"
          },
          "d": {
            "en": "Striking from darkness, it grabs a player and drags them toward the darkest corner.",
            "ru": "Ударяя из темноты, хватает игрока и тащит в тёмный угол."
          }
        },
        {
          "n": {
            "en": "Enemy of Flame and Dawn",
            "ru": "Враг пламени и рассвета"
          },
          "d": {
            "en": "Takes massive damage from Fire and Light.",
            "ru": "Получает огромный урон от Огня и Света."
          }
        }
      ],
      "counter": {
        "en": "If hit by a powerful light spell or a thrown torch, it is stunned and releases its victim.",
        "ru": "Попав под мощное световое заклинание или брошенный факел, он оглушается и отпускает жертву."
      }
    },
    {
      "id": "lich",
      "icon": "☠️",
      "threat": "boss",
      "hp": "700",
      "dmg": "100",
      "name": {
        "en": "Lich",
        "ru": "Лич"
      },
      "lore": {
        "en": "A desecrated lord of the dead whose bones still carry forbidden knowledge. Wherever the Lich walks, death ceases to be rest and becomes only another form of servitude.",
        "ru": "Осквернённый повелитель мёртвых, чьи кости хранят запретное знание. Где ступает Лич, смерть перестаёт быть покоем и становится лишь иной формой служения."
      },
      "abilities": [
        {
          "n": {
            "en": "Rise, Servants of Dust",
            "ru": "Восстаньте, слуги праха"
          },
          "d": {
            "en": "Raises all corpses within 8 meters, including fallen players, to fight on its side.",
            "ru": "Поднимает все трупы в радиусе 8м, включая павших игроков."
          }
        },
        {
          "n": {
            "en": "Bone Prison",
            "ru": "Костяная темница"
          },
          "d": {
            "en": "Conjures a cage of bone around a random player until allies destroy it. Bone Prison Health: 150.",
            "ru": "Создаёт клетку из костей вокруг случайного игрока, пока союзники не разрушат её. HP темницы: 150."
          }
        }
      ],
      "counter": {
        "en": "A Lich is most dangerous in drawn-out encounters where the dead become reinforcements. Interrupting its casting matters more than raw damage. A Priest's holy magic is especially potent.",
        "ru": "Лич опаснее всего в затяжных боях, где мёртвые становятся подкреплением. Прерывание каста важнее чистого урона. Святая магия Жреца особенно губительна."
      }
    },
    {
      "id": "shardfall-golem",
      "icon": "🗟",
      "threat": "boss",
      "hp": "1500",
      "dmg": "200",
      "name": {
        "en": "Shardfall Golem",
        "ru": "Голем Осколкопада"
      },
      "lore": {
        "en": "A colossal sentinel hewn from the bones of the cavern itself. Blind though it is, the cave serves as its eyes and skin. Every footstep, every spell, every frightened whisper trembles through the stone and calls its wrath.",
        "ru": "Колоссальный страж, высеченный из костей самой пещеры. Слеп, но пещера служит ему глазами и кожей. Каждый шаг, каждое заклинание, каждый испуганный шёпот дрожью проходит сквозь камень и будит его гнев."
      },
      "abilities": [
        {
          "n": {
            "en": "Blind Judgment",
            "ru": "Слепой суд"
          },
          "d": {
            "en": "Completely blind and reacts only to sound: running, sword strikes, spellcasting, and even players' voice chat.",
            "ru": "Полностью слеп и реагирует только на звук: бег, удары, касты и даже голосовой чат игроков."
          }
        },
        {
          "n": {
            "en": "Seismic Slam",
            "ru": "Сейсмический удар"
          },
          "d": {
            "en": "Slams the ground, causing stalactites to fall. A shadow marker appears one second before impact.",
            "ru": "Бьёт по земле, обрушивая сталактиты. За секунду до удара появляется тень-маркер."
          }
        },
        {
          "n": {
            "en": "Weight of the Mountain",
            "ru": "Вес горы"
          },
          "d": {
            "en": "Each step creates a small slow zone around it for a few seconds.",
            "ru": "Каждый шаг создаёт вокруг зону замедления на несколько секунд."
          }
        }
      ],
      "counter": {
        "en": "This creature punishes not just mistakes, but habits. Against it, the party must learn silence. Distance, discipline, and noise control matter more than bravery.",
        "ru": "Эта тварь карает не только ошибки, но и привычки. Против неё группа должна научиться тишине. Дистанция, дисциплина и контроль шума важнее храбрости."
      }
    },
    {
      "id": "marble-gargoyle",
      "icon": "🐉",
      "threat": "high",
      "hp": "2000",
      "dmg": "150",
      "name": {
        "en": "Marble Gargoyle",
        "ru": "Мраморная горгулья"
      },
      "lore": {
        "en": "A cursed watcher of ancient halls. While seen, it is stone. The instant every gaze slips away, the stone remembers that it was once a predator.",
        "ru": "Проклятый страж древних залов. Пока на неё смотрят — она камень. В миг, когда каждый взгляд ускользает, камень вспоминает, что был хищником."
      },
      "abilities": [
        {
          "n": {
            "en": "Oath of Stillness",
            "ru": "Обет неподвижности"
          },
          "d": {
            "en": "As long as at least one player keeps it in sight, it is a motionless stone statue.",
            "ru": "Пока хотя бы один игрок держит её в поле зрения, она — неподвижная статуя."
          }
        },
        {
          "n": {
            "en": "Step Between Blinks",
            "ru": "Шаг между морганиями"
          },
          "d": {
            "en": "The moment no one is looking, it moves with terrifying speed.",
            "ru": "Как только никто не смотрит — двигается с ужасающей скоростью."
          }
        },
        {
          "n": {
            "en": "Stone Whisper",
            "ru": "Каменный шёпот"
          },
          "d": {
            "en": "Makes almost no sound while hunting — only the faint grinding of stone.",
            "ru": "Почти не издаёт звуков при охоте — лишь тихий скрежет камня."
          }
        },
        {
          "n": {
            "en": "Stone Skin",
            "ru": "Каменная кожа"
          },
          "d": {
            "en": "Immune to physical damage.",
            "ru": "Иммунна к физическому урону."
          }
        }
      ],
      "counter": {
        "en": "One player must commit to holding its gaze while the others create a way out. Light magic and blinding effects buy precious time.",
        "ru": "Один игрок должен держать её взглядом, пока остальные ищут выход. Свет и ослепляющие эффекты выигрывают драгоценное время."
      }
    },
    {
      "id": "doppelganger",
      "icon": "🎭",
      "threat": "boss",
      "hp": "800",
      "dmg": "—",
      "name": {
        "en": "Doppelganger",
        "ru": "Доппельгангер"
      },
      "lore": {
        "en": "A creature with no face of its own, dwelling somewhere between reflection and flesh. It does not imitate the living — it wears them. And the worst horror is how convincing the mask can be.",
        "ru": "Существо без собственного лица, обитающее между отражением и плотью. Оно не подражает живым — оно носит их. И худший ужас в том, насколько убедительна маска."
      },
      "abilities": [
        {
          "n": {
            "en": "Stolen Face",
            "ru": "Украденное лицо"
          },
          "d": {
            "en": "Assumes a target's exact appearance, including silhouette, equipment, animations, and carried items.",
            "ru": "Принимает точный облик цели — силуэт, экипировку, анимации, предметы."
          }
        },
        {
          "n": {
            "en": "Borrowed Mastery",
            "ru": "Заимствованное мастерство"
          },
          "d": {
            "en": "Copies all active abilities, passive traits, and usable items of the chosen player.",
            "ru": "Копирует все активные способности, пассивы и предметы выбранного игрока."
          }
        },
        {
          "n": {
            "en": "Flawless Reflection",
            "ru": "Безупречное отражение"
          },
          "d": {
            "en": "Until the moment it strikes, it is indistinguishable from the real player by ordinary means. It can move with the group and imitate behavior.",
            "ru": "До момента удара неотличим от настоящего игрока. Может двигаться с группой и имитировать поведение."
          }
        },
        {
          "n": {
            "en": "Hour of Sundering",
            "ru": "Час раскола"
          },
          "d": {
            "en": "At the right moment, it reveals itself and attacks using the same weapons, skills, spells, and tools as the original.",
            "ru": "В нужный момент раскрывается и атакует тем же оружием и навыками, что и оригинал."
          }
        },
        {
          "n": {
            "en": "Memory of Flesh",
            "ru": "Память плоти"
          },
          "d": {
            "en": "If the original swaps weapons or uses abilities after the copy is made, the Doppelganger may echo its stolen arsenal.",
            "ru": "Если оригинал сменил оружие после копирования — двойник может отразить обновлённый арсенал."
          }
        }
      ],
      "counter": {
        "en": "Do not trust your eyes — trust procedure. Survival depends not on observation but on discipline: code phrases, paired movement, role checks. The more a party relies on chaos, the deadlier this thing becomes.",
        "ru": "Не доверяйте глазам — доверяйте процедуре. Кодовые фразы, парное движение, проверки ролей. Чем больше группа полагается на хаос — тем смертоноснее эта тварь."
      }
    }
  ],
  "loot": {
    "rarityIntro": {
      "en": "Loot is divided into four rarity tiers. The deeper the floor (1–10), the higher the chance to find rare and legendary items.",
      "ru": "Лут делится на четыре уровня редкости. Чем глубже этаж (1–10), тем выше шанс найти редкие и легендарные предметы."
    },
    "fragments": [
      {
        "v": "10",
        "n": {
          "en": "Bosses",
          "ru": "Боссы"
        },
        "d": {
          "en": "Guaranteed fragments for defeating a floor boss.",
          "ru": "Гарантированные фрагменты за убийство босса этажа."
        }
      },
      {
        "v": "+5",
        "n": {
          "en": "First clear",
          "ru": "Первое прохождение"
        },
        "d": {
          "en": "Bonus fragments the first time a floor is cleared.",
          "ru": "Бонусные фрагменты за первое прохождение этажа."
        }
      },
      {
        "v": "15",
        "n": {
          "en": "Main route",
          "ru": "Базовый путь"
        },
        "d": {
          "en": "Fragments gathered along the main route of a run.",
          "ru": "Фрагменты, собираемые на основном пути забега."
        }
      }
    ],
    "categories": [
      {
        "key": "relics",
        "icon": "🏺",
        "name": {
          "en": "Relics",
          "ru": "Реликвии"
        },
        "note": {
          "en": "Ancient artifacts — collectible value and a source of lore.",
          "ru": "Древние артефакты — коллекционная ценность и источник лора."
        },
        "tiers": {
          "common": [
            {
              "id": "relics--clay-knight-figurine",
              "n": {
                "en": "Clay Knight Figurine",
                "ru": "Глиняная фигурка рыцаря"
              }
            },
            {
              "id": "relics--cracked-idol-of-the-ancestors",
              "n": {
                "en": "Cracked Idol of the Ancestors",
                "ru": "Треснувший идол предков"
              }
            },
            {
              "id": "relics--deadwood-staff",
              "n": {
                "en": "Deadwood Staff",
                "ru": "Посох из мёртвого дерева"
              }
            },
            {
              "id": "relics--deserters-medallion",
              "n": {
                "en": "Deserter's Medallion",
                "ru": "Медальон дезертира"
              }
            },
            {
              "id": "relics--elven-ceramic-shard",
              "n": {
                "en": "Elven Ceramic Shard",
                "ru": "Эльфийский керамический осколок"
              }
            },
            {
              "id": "relics--faded-spellbook",
              "n": {
                "en": "Faded Spellbook",
                "ru": "Выцветший гримуар"
              }
            },
            {
              "id": "relics--ghost-hunters-ring",
              "n": {
                "en": "Ghost Hunter's Ring",
                "ru": "Кольцо охотника на призраков"
              }
            },
            {
              "id": "relics--old-bronze-goblet",
              "n": {
                "en": "Old Bronze Goblet",
                "ru": "Старый бронзовый кубок"
              }
            },
            {
              "id": "relics--prickly-talisman",
              "n": {
                "en": "Prickly Talisman",
                "ru": "Колючий талисман"
              }
            },
            {
              "id": "relics--shard-of-a-runic-mirror",
              "n": {
                "en": "Shard of a Runic Mirror",
                "ru": "Осколок рунного зеркала"
              }
            }
          ],
          "rare": [
            {
              "id": "relics--golden-goblet",
              "n": {
                "en": "Golden Goblet",
                "ru": "Золотой кубок"
              }
            },
            {
              "id": "relics--mask-of-the-forgotten-god",
              "n": {
                "en": "Mask of the Forgotten God",
                "ru": "Маска забытого бога"
              }
            },
            {
              "id": "relics--moonwitchs-bracelet",
              "n": {
                "en": "Moonwitch's Bracelet",
                "ru": "Браслет лунной ведьмы"
              }
            },
            {
              "id": "relics--ornate-key",
              "n": {
                "en": "Ornate Key",
                "ru": "Резной ключ"
              }
            },
            {
              "id": "relics--phoenix-feather",
              "n": {
                "en": "Phoenix Feather",
                "ru": "Перо феникса"
              }
            },
            {
              "id": "relics--satyrs-pan-flute",
              "n": {
                "en": "Satyr's Pan Flute",
                "ru": "Флейта Пана сатира"
              }
            }
          ],
          "epic": [
            {
              "id": "relics--crystal-of-unfading-light",
              "n": {
                "en": "Crystal of Unfading Light",
                "ru": "Кристалл негаснущего света"
              }
            },
            {
              "id": "relics--eye-of-the-ancient-deity",
              "n": {
                "en": "Eye of the Ancient Deity",
                "ru": "Око древнего божества"
              }
            },
            {
              "id": "relics--fallen-paladins-crown",
              "n": {
                "en": "Fallen Paladin's Crown",
                "ru": "Корона павшего паладина"
              }
            },
            {
              "id": "relics--golem-heartstone",
              "n": {
                "en": "Golem Heartstone",
                "ru": "Сердечный камень голема"
              }
            }
          ],
          "legendary": [
            {
              "id": "relics--black-dragon-claw",
              "n": {
                "en": "Black Dragon Claw",
                "ru": "Коготь чёрного дракона"
              }
            },
            {
              "id": "relics--heart-of-the-forest-lord",
              "n": {
                "en": "Heart of the Forest Lord",
                "ru": "Сердце лесного владыки"
              }
            }
          ]
        }
      },
      {
        "key": "weapons",
        "icon": "⚔️",
        "name": {
          "en": "Weapons",
          "ru": "Оружие"
        },
        "note": {
          "en": "Determines damage (W) and attack speed.",
          "ru": "Определяет урон (W) и скорость атаки."
        },
        "tiers": {
          "common": [
            {
              "id": "weapons--rusty-sword",
              "n": {
                "en": "Rusty Sword",
                "ru": "Ржавый меч"
              },
              "s": {
                "en": "Damage +15 · Range +1m",
                "ru": "Урон +15 · Дальность +1м"
              }
            },
            {
              "id": "weapons--worn-shield",
              "n": {
                "en": "Worn Shield",
                "ru": "Потёртый щит"
              },
              "s": {
                "en": "Armor +1 · Attack time +0.5s",
                "ru": "Броня +1 · Время атаки +0.5с"
              }
            },
            {
              "id": "weapons--rusty-dagger",
              "n": {
                "en": "Rusty Dagger",
                "ru": "Ржавый кинжал"
              },
              "s": {
                "en": "Damage +7.5 · Attack time −0.25s",
                "ru": "Урон +7.5 · Время атаки −0.25с"
              }
            }
          ],
          "rare": [
            {
              "id": "weapons--steel-sword",
              "n": {
                "en": "Steel Sword",
                "ru": "Стальной меч"
              },
              "s": {
                "en": "Damage +25 · Range +1m",
                "ru": "Урон +25 · Дальность +1м"
              }
            },
            {
              "id": "weapons--steel-dagger",
              "n": {
                "en": "Steel Dagger",
                "ru": "Стальной кинжал"
              },
              "s": {
                "en": "Damage +12 · Attack time −0.25s",
                "ru": "Урон +12 · Время атаки −0.25с"
              }
            }
          ],
          "epic": [],
          "legendary": []
        }
      },
      {
        "key": "armor",
        "icon": "🦺",
        "name": {
          "en": "Armor",
          "ru": "Броня"
        },
        "note": {
          "en": "Provides physical armor and magic resistance.",
          "ru": "Даёт физическую броню и магическое сопротивление."
        },
        "tiers": {
          "common": [
            {
              "id": "armor--travelers-hood",
              "n": {
                "en": "Traveler's Hood",
                "ru": "Капюшон путника"
              },
              "s": {
                "en": "Phys. armor 1 · Magic resist 1",
                "ru": "Физ. броня 1 · Маг. сопрот. 1"
              },
              "d": {
                "en": "Part of the Traveler's Set.",
                "ru": "Часть Набора путника."
              }
            },
            {
              "id": "armor--travelers-vest",
              "n": {
                "en": "Traveler's Vest",
                "ru": "Жилет путника"
              },
              "s": {
                "en": "Phys. armor 1 · Magic resist 1",
                "ru": "Физ. броня 1 · Маг. сопрот. 1"
              },
              "d": {
                "en": "Part of the Traveler's Set.",
                "ru": "Часть Набора путника."
              }
            },
            {
              "id": "armor--travelers-trousers",
              "n": {
                "en": "Traveler's Trousers",
                "ru": "Штаны путника"
              },
              "s": {
                "en": "Phys. armor 1 · Magic resist 1",
                "ru": "Физ. броня 1 · Маг. сопрот. 1"
              },
              "d": {
                "en": "Part of the Traveler's Set.",
                "ru": "Часть Набора путника."
              }
            },
            {
              "id": "armor--travelers-boots",
              "n": {
                "en": "Traveler's Boots",
                "ru": "Сапоги путника"
              },
              "s": {
                "en": "Phys. armor 1 · Magic resist 1",
                "ru": "Физ. броня 1 · Маг. сопрот. 1"
              },
              "d": {
                "en": "Part of the Traveler's Set.",
                "ru": "Часть Набора путника."
              }
            }
          ],
          "rare": [],
          "epic": [],
          "legendary": []
        }
      },
      {
        "key": "consumables",
        "icon": "🧪",
        "name": {
          "en": "Consumables",
          "ru": "Расходники"
        },
        "note": {
          "en": "Single-use potions and consumable items.",
          "ru": "Одноразовые зелья и расходуемые предметы."
        },
        "tiers": {
          "common": [
            {
              "id": "consumables--common-health-potion",
              "n": {
                "en": "Common Health Potion",
                "ru": "Обычное зелье здоровья"
              },
              "s": {
                "en": "Restores: 40 HP",
                "ru": "Восстанавливает: 40 HP"
              },
              "d": {
                "en": "A basic healing potion.",
                "ru": "Базовое зелье лечения."
              }
            },
            {
              "id": "consumables--common-mana-potion",
              "n": {
                "en": "Common Mana Potion",
                "ru": "Обычное зелье маны"
              },
              "s": {
                "en": "Restores: 25 mana",
                "ru": "Восстанавливает: 25 маны"
              },
              "d": {
                "en": "A basic mana potion.",
                "ru": "Базовое зелье маны."
              }
            }
          ],
          "rare": [],
          "epic": [],
          "legendary": []
        }
      }
    ]
  }
};
