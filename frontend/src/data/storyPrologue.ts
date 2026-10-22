export interface DialogueLine {
  speaker: string;
  text: string;
  shakeScreen?: boolean;
}

export const STORY_SCRIPTS: Record<string, DialogueLine[]> = {
  // 1. Mở đầu trong lớp học khi vừa vào game
  classroom_explosion_intro: [
    {
      speaker: 'Karin',
      text: 'Phù... Bài tập hình học phẳng với phương trình hàm hôm nay khó thật đấy. Cậu giải xong câu cuối chưa Kai?'
    },
    {
      speaker: 'Kai',
      text: 'Sắp xong rồi. Chỉ cần biến đổi thêm một bước nữa là... Khoan đã Karin, cậu có thấy cốc nước trên bàn đang tự rung lên không?'
    },
    {
      speaker: 'HỆ THỐNG',
      text: 'ĐOÀNGGG!! — Một tiếng nổ siêu thanh trầm đục xé toạc bầu trời chiều! Mặt đất chấn động dữ dội, cửa kính lớp học rạn nứt!',
      shakeScreen: true
    },
    {
      speaker: 'Karin',
      text: 'Á!! Chuyện gì vậy?! Động đất sao?! Không phải... Nhìn ra ngoài cửa sổ kìa Kai!'
    },
    {
      speaker: 'Kai',
      text: 'Bầu trời phía trên Cổng Trường... đang bị xé rách thành một vòng xoáy màu tím đen! Trọng lực ở đó đang hút ngược gạch đá lên trời!'
    },
    {
      speaker: 'Kai',
      text: 'Mau rời khỏi phòng học thôi Karin! Chúng ta phải ra phía Cổng Trường xem chuyện gì đang xảy ra và tìm đường thoát!'
    }
  ],

  // 2. Khi nói chuyện với Kai ở trong lớp
  kai_classroom_prompt: [
    {
      speaker: 'Kai',
      text: 'Cửa lớp ở góc dưới bên phải phòng học (ô màu vàng). Đi cẩn thận nhé Karin, dư chấn vẫn còn đấy!'
    }
  ],

  // 3. Sự kiện khi bước tới gần Vết Nứt ở Cổng Trường (Kích hoạt chuyển giao đến Ngày 432)
  gate_anomaly_trigger: [
    {
      speaker: 'Karin',
      text: 'Không thể tin vào mắt mình nữa... Toàn bộ cổng sắt của trường đã bị bẻ cong. Khối tinh thể tím đen kia đang phát ra thứ âm thanh gì thế này?'
    },
    {
      speaker: 'Kai',
      text: 'Karin, lùi lại! Tần số năng lượng từ Vết Nứt đang tăng vọt! Có những bóng đen kỳ dị đang trồi lên từ mặt đất!'
    },
    {
      speaker: 'HỆ THỐNG',
      text: '[CẢNH BÁO DỊ BIẾN]: Vết Nứt Không-Thời Gian (Spatial-Temporal Rift) đạt ngưỡng tới hạn! Một luồng sóng xung kích nuốt chửng toàn bộ cổng trường!',
      shakeScreen: true
    },
    {
      speaker: 'Kai',
      text: 'Nắm chặt tay tớ Karin!! Đừng buông ra—!!'
    }
  ],

  // 4. Đoạn dẫn chuyện giải thích bước nhảy thời gian sang Ngày 432
  timeskip_explanation: [
    {
      speaker: 'Biên Niên Sử Hầm Ngục',
      text: 'Vụ nổ tại Cổng Trường ngày hôm đó được nhân loại gọi là "Khởi Nguyên Đại Dị Biến" (Day 0).'
    },
    {
      speaker: 'Biên Niên Sử Hầm Ngục',
      text: 'Khi tâm chấn phát nổ, Karin và Kai không hề tử vong. Cả hai bị cuốn vào "Kén Ngưng Đọng Thời Gian" (Chrono-Stasis) ngay tại ranh giới tầng sâu nhất của Vết Nứt.'
    },
    {
      speaker: 'Biên Niên Sử Hầm Ngục',
      text: 'Đối với Karin, khoảnh khắc nhắm mắt lại chỉ kéo dài vỏn vẹn 3 giây... Nhưng ở thế giới bên ngoài, 432 ngày đẫm máu đã trôi qua.'
    },
    {
      speaker: 'Biên Niên Sử Hầm Ngục',
      text: 'Ngôi trường cấp 3 năm xưa giờ đã hóa thành tiền đồn bao quanh Hầm Ngục. Và hôm nay — Ngày thứ 432 — lớp phong ấn tinh thể cuối cùng đã vỡ...'
    }
  ],

  // 5. Khi tỉnh dậy ở Ngày 432 và gặp Rook & Kai
  day432_awakening: [
    {
      speaker: 'Karin',
      text: 'Ưm... Đầu mình đau quá... Kai? Vụ nổ vừa rồi... Chúng ta vẫn còn ở cổng trường sao?'
    },
    {
      speaker: 'Rook (Chỉ huy Tiền Đồn)',
      text: 'Không thể tin được... Máy dò sinh học báo có tín hiệu sống phát ra từ Lõi Tinh Thể Cổng Trường, hóa ra là hai học sinh mặc đồng phục cũ!'
    },
    {
      speaker: 'Kai',
      text: 'Karin, nhìn đồng hồ định vị và cảnh vật xung quanh đi... Cây cối đã mọc trùm lên đống đổ nát. Người đàn ông này nói rằng... đã 432 ngày trôi qua kể từ chiều hôm đó rồi!'
    },
    {
      speaker: 'Rook (Chỉ huy Tiền Đồn)',
      text: 'Chào mừng trở lại thế giới thực, hai đứa nhóc. Ta là Rook. Suốt 432 ngày qua你們 bị đóng băng trong dị giới, thế giới đã thay đổi hoàn toàn. Hãy nói chuyện với mọi người trong trại để nắm tình hình!'
    }
  ]
};